import { Request, Response } from "express"
import { Organization } from "../../entity/organization/Organization.entity"
import { User } from "../../entity/user/User.entity"
import { generatePassword, sendWelcomeEmail } from "../../utils/helpers"
import { AppDataSource } from "../../data-source" // Import your data source
import { Subsidiary } from "../../entity/organization/Subsidiary.entity"
import {
    createSubsidiaryValidationSchema,
    updateSubsidiaryValidationSchema,
} from "../../validations/subsidiary"
import { AnyObject } from "../../types/common"

export class SubsidiaryController {
    static async getSubsidiary(req: Request, res: Response) {
        const subsidiary = await Subsidiary.findOne({
            where: { id: req.params.id },
            relations: { users: true, facility: true },
        })
        res.status(200).json({ data: subsidiary })
    }
    static async createSubsidiary(req: Request, res: Response) {
        const queryRunner = AppDataSource.createQueryRunner()

        // Start the transaction
        await queryRunner.startTransaction()

        try {
            const body = await createSubsidiaryValidationSchema.parseAsync(req.body)

            // check whether the parent of this subsidiary exists in the database
            const organization = await Organization.findOne({ where: { id: body.parent } })
            if (!organization) {
                throw new Error(`Parent organization of this subsidiary does not exist`)
            }
            // Create a new organization instance and save it in the transaction
            const subsidiary = new Subsidiary()
            Object.assign(subsidiary, { ...body, users: [] })
            const savedSubsidiary = await queryRunner.manager.save(subsidiary)

            // Create users if body contains subsidiary users
            if (body.users) {
                // remove the current logged in user, if present in body
                const filteredUsers = body.users.filter((user) => user.email !== req.user.email)
                for (const user of filteredUsers) {
                    // Check if the user already exists
                    const existingUser = await queryRunner.manager.findOne(User, {
                        where: { email: user.email },
                    })
                    if (existingUser) {
                        throw new Error(`User with email ${user.email} already exists`)
                    }

                    // Create a new user instance
                    const _user = new User()
                    Object.assign(_user, user)

                    // Generate password for this newly created user
                    const password = generatePassword(8)
                    _user.password = password
                    _user.subsidiary = savedSubsidiary

                    // Save user in the transaction
                    const savedUser = await queryRunner.manager.save(_user)

                    // Send welcome email to the newly created users
                    sendWelcomeEmail({
                        recipients: [
                            { address: savedUser.email, displayName: savedUser.first_name },
                        ],
                        username: savedUser.username,
                        password,
                    })

                    // Add user to the organization's users array
                    savedSubsidiary.users = savedSubsidiary.users?.length
                        ? [...savedSubsidiary.users, savedUser]
                        : [savedUser]

                    // Save the updated organization with users
                    await queryRunner.manager.save(savedSubsidiary)
                }
            }
            // add the current user to the subsidiary users
            savedSubsidiary.users = [...savedSubsidiary.users, req.user as User]
            await queryRunner.manager.save(savedSubsidiary)
            // also add the current subsidiary to the user subsidiary column
            const _user = { ...req.user, subsidiary: savedSubsidiary }
            await queryRunner.manager.update(User, { id: req.user.id }, _user as User)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Remove users from response to avoid circular dependencies
            delete savedSubsidiary.users

            // Send success response
            res.status(201).json({
                message: "Subsidiary created successfully",
                data: savedSubsidiary,
            })
        } catch (error) {
            // Rollback the transaction in case of errors
            await queryRunner.rollbackTransaction()

            // Send error response
            throw error
        } finally {
            // Release the query runner to free up resources
            await queryRunner.release()
        }
    }
    static async updateSubsidiary(req: Request, res: Response) {
        const subsidiaryId = req.params.id
        const queryRunner = AppDataSource.createQueryRunner()
        // Start the transaction
        await queryRunner.startTransaction()
        try {
            const body = await updateSubsidiaryValidationSchema.parseAsync(req.body)
            const subsidiary = await Subsidiary.findOne({
                where: { id: subsidiaryId },
                relations: { users: true },
            })
            if (!subsidiary) {
                throw new Error(`No subsidiary found for the provided ID`)
            }
            const allCreatedUsers: User[] = []
            // Create users if body contains organization users
            if (body.users) {
                // remove the current logged in user, if present in body
                const filteredUsers = body.users.filter((user) => !user?.id)
                for (const user of filteredUsers) {
                    // Check if the user already exists
                    const existingUser = await queryRunner.manager.findOne(User, {
                        where: { email: user.email },
                    })
                    if (existingUser) {
                        throw new Error(`User with email ${user.email} already exists`)
                    }

                    // Create a new user instance
                    const _user = new User()
                    Object.assign(_user, user)

                    // Generate password for this newly created user
                    const password = generatePassword(8)
                    _user.password = password
                    _user.subsidiary = subsidiary

                    // Save user in the transaction
                    const savedUser = await queryRunner.manager.save(_user)

                    // Send welcome email to the newly created users
                    sendWelcomeEmail({
                        recipients: [
                            { address: savedUser.email, displayName: savedUser.first_name },
                        ],
                        username: savedUser.username,
                        password,
                    })
                    allCreatedUsers.push(savedUser)
                }
            }
            // as we have already added users to the organization, delete them from body
            delete body.users
            Object.assign(subsidiary, body) // Update subsidiary with new values
            subsidiary.users.concat(allCreatedUsers)
            await queryRunner.manager.save(Subsidiary, subsidiary)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Send success response
            res.status(200).json({
                message: "Subsidiary updated successfully",
                data: subsidiary,
            })
        } catch (error) {
            // console.log(error, "error")
            // Rollback the transaction in case of errors
            await queryRunner.rollbackTransaction()

            // Send error response
            throw error
        } finally {
            // Release the query runner to free up resources
            await queryRunner.release()
        }
    }
    static async getSubsidiaryUsers(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            throw new Error(`ID is required to find subsidiary users`)
        }
        const {
            page = 1,
            limit = 10,
            pagination = false,
            sort_on = "user.created_at",
            sort = "DESC",
        } = req.query as AnyObject
        const offset = (page - 1) * parseInt(limit)
        const userBuilder = User.createQueryBuilder("user")
        const count = await userBuilder.where([{ subsidiary: { id } }]).getCount()
        if (pagination) {
            delete req.query["pagination"]
            delete req.query["limit"]
            delete req.query["page"]
            const results = await userBuilder
                .where([{ subsidiary: { id } }])
                .orderBy(sort_on, sort.toUpperCase())
                .skip(offset)
                .take(limit)
                .getMany()
            res.status(200).json({
                data: results,
                page,
                total_count: count,
                limit,
            })
        } else {
            const users = await User.find({
                where: [{ subsidiary: { id } }],
            })
            res.status(200).json({ data: users })
        }
    }
}
