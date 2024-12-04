import { addJobsTEmailoQueue } from "./../../utils/provider"
import { Request, Response } from "express"
import { User } from "../../entity/user/User.entity"
import {
    generateOtp,
    generatePassword,
    generateShortId,
    generateToken,
    sliceText,
    slugifyText,
} from "../../utils/helpers"
import {
    authSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateUserSchema,
} from "../../validations/auth"
import { Demo } from "../../entity/book-demo/Demo.entity"
import { Role } from "../../enum/role.enum"
import dayjs from "dayjs"
import { PASSWORD_RESET_COUNT } from "../../utils/constants"

export class UserController {
    static async loginUser(req: Request, res: Response) {
        const { email, password } = await authSchema.parseAsync(req.body)
        const user = await User.findOne({
            where: [{ email }, { username: email }],
            relations: { organization: true, subsidiary: true, facility: true },
        })
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user.id)
            delete user.password
            delete user.otp
            delete user.otp_generated_at
            res.status(200).json({
                ...user,
                token,
            })
        } else {
            res.status(401)
            throw new Error(`Invalid email or password`)
        }
    }
    static async sendOtp(req: Request, res: Response) {
        const { email } = await forgotPasswordSchema.parseAsync(req.body)
        const user = await User.findOne({
            where: [{ email }, { username: email }],
        })

        if (!user) {
            res.status(400)
            throw new Error(`Email or username is not registered with us`)
        }

        // Check if the password reset count exceeds the limit, unless it's ENVISTRIDE
        if (
            user.password_reset_count < PASSWORD_RESET_COUNT ||
            req?.user?.role === Role.ENVISTRIDE
        ) {
            const otp = generateOtp()
            user.otp = otp
            user.otp_generated_at = dayjs().unix()

            // Reset password count for ENVISTRIDE users
            if (req?.user?.role === Role.ENVISTRIDE) {
                user.password_reset_count = 0
            }

            // Add the email sending job to the queue
            await addJobsTEmailoQueue({
                data: {
                    subject: "Request Reset Password",
                    recipients: [{ address: user.email, displayName: user.first_name }],
                    plainText: `OTP: ${otp}`,
                    html: "", // Add HTML template if needed
                },
            })

            await user.save()

            res.status(200).json({
                message: "OTP has been sent successfully",
            })
        } else {
            res.status(400)
            throw new Error(
                `You cannot reset the password more than ${PASSWORD_RESET_COUNT} times. Please contact the administrator.`,
            )
        }
    }

    static async resetPassword(req: Request, res: Response) {
        const { email, password, otp } = await resetPasswordSchema.parseAsync(req.body)
        const user = await User.findOne({
            where: [{ email }, { username: email }],
        })
        if (user && user.otp && parseInt(otp) === user.otp) {
            console.log(dayjs.unix(user.otp_generated_at).diff(dayjs(), "minutes"))
            const isValid = dayjs.unix(user.otp_generated_at).diff(dayjs(), "minutes") < 5
            if (isValid) {
                user.password = password
                user.otp_generated_at = null
                user.otp = null
                await addJobsTEmailoQueue({
                    data: {
                        subject: "Password reset successful",
                        recipients: [{ address: user.email, displayName: user.first_name }],
                        plainText: `Your password has been reset successfully.`,
                        html: "",
                    },
                })
                user.password_reset_count += 1
                await user.save()
                res.status(200).json({
                    message: "Password reset successful",
                })
            } else throw new Error(`OTP expired`)
        } else {
            res.status(401)
            throw new Error(`Invalid OTP`)
        }
    }
    static async createUserBySubmittedForm(req: Request, res: Response) {
        const formId = req.body.id
        if (!formId) {
            throw new Error(`Id must be provided`)
        }
        const submittedForm = await Demo.findOne({
            where: { id: formId },
            relations: { user: true },
        })
        if (submittedForm) {
            // check whether the credentials were  generated or not
            if (submittedForm && submittedForm.credentials_generated) {
                // get the credentials
                const user = await User.findOne({ where: { id: submittedForm.user.id } })
                const generatedPassword = generatePassword()
                user.password = generatedPassword
                user.email = submittedForm.email
                const userSaved = await user.save()
                // resend the email with same credentials
                await addJobsTEmailoQueue({
                    data: {
                        recipients: [
                            { address: submittedForm.email, displayName: submittedForm.first_name },
                        ],
                        plainText: "Hello",
                        subject: "Welcome to EnviStride",
                        html: `<p>Your generated username and password is: <br/><br/>
                        <strong>Username: ${userSaved.username}</strong>
                        <br/>
                        <strong>Password: ${generatedPassword}</strong>
                        </p>`,
                    },
                })
                res.status(200).json({ message: "Credentials generated and sent successfully" })
            } else {
                // create the user and send the email
                const generatedPassword = generatePassword()
                const shortId = generateShortId()
                const user = new User()
                user.first_name = submittedForm.first_name
                user.last_name = submittedForm.last_name
                user.phone_country_code = submittedForm.phone_country_code
                user.phone_number = submittedForm.phone_country_code
                user.password = generatedPassword
                user.username = slugifyText(`${sliceText(submittedForm.company)}_${shortId}`)
                user.role = Role.SUPER_ADMIN
                const userSaved = await user.save()
                submittedForm.credentials_generated = true
                submittedForm.user = userSaved
                await submittedForm.save()
                await addJobsTEmailoQueue({
                    data: {
                        recipients: [
                            { address: submittedForm.email, displayName: submittedForm.first_name },
                        ],
                        plainText: "Hello",
                        subject: "Welcome to EnviStride",
                        html: `<p>Your generated username and password is: <br/><br/>
                    <strong>Username: ${userSaved.username}</strong>
                    <br/>
                    <strong>Password: ${generatedPassword}</strong>
                    </p>`,
                    },
                })
                res.status(200).json({ message: "Credentials generated and sent successfully" })
            }
        } else {
            throw new Error("Unable to find the submitted form")
        }
    }
    static async updateUser(req: Request, res: Response) {
        const { id } = req.params // Get user ID from route parameters
        const updateData = await updateUserSchema.parseAsync(req.body) // Validate data using Zod schema

        // Find the user by ID
        const user = await User.findOne({ where: { id } })
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }

        // Update user fields with provided data
        Object.assign(user, updateData)

        // Save updated user data to the database
        const updatedUser = await user.save()

        // Return the updated user information
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        })
    }
}
