import { Subsidiary } from "./../../entity/organization/Subsidiary.entity"
import { Request, Response } from "express"
import { Organization } from "../../entity/organization/Organization.entity"
import { User } from "../../entity/user/User.entity"
import { generatePassword, sendWelcomeEmail } from "../../utils/helpers"
import { AppDataSource } from "../../data-source" // Import your data source
import { Facility } from "../../entity/organization/Facility.entity"
import {
    createFacilityValidationSchema,
    updateFacilityValidationSchema,
} from "../../validations/facility"
import { AnyObject } from "../../types/common"

export class FacilityController {
    static async getFacility(req: Request, res: Response) {
        const facility = await Facility.findOne({
            where: { id: req.params.id },
            relations: { users: true, subsidiary: true, parent: true },
        })
        res.status(200).json({ data: facility })
    }
    static async createFacility(req: Request, res: Response) {
        const queryRunner = AppDataSource.createQueryRunner()

        // Start the transaction
        await queryRunner.startTransaction()

        try {
            const body = await createFacilityValidationSchema.parseAsync(req.body)
            // check whether the parent of this facility exists in the database
            let organization: Organization = null
            let subsidiary: Subsidiary = null
            if (body.parent)
                organization = await Organization.findOne({ where: { id: body.parent } })
            if (body.subsidiary)
                subsidiary = await Subsidiary.findOne({ where: { id: body.subsidiary ?? null } })
            console.log(organization, subsidiary)
            if (!organization && !subsidiary) {
                throw new Error(`Parent organization of this facility does not exist`)
            } else if (organization && subsidiary) {
                throw new Error(
                    `Facility can only be registered under organization or subsidiary not both.`,
                )
            }
            // Create a new organization instance and save it in the transaction
            const facility = new Facility()
            Object.assign(facility, { ...body, users: [] })
            const savedFacility = await queryRunner.manager.save(facility)
            // Create users if body contains facility users
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
                    _user.facility = savedFacility

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
                    // Add user to the facility's users array
                    savedFacility.users = savedFacility.users?.length
                        ? [...savedFacility.users, savedUser]
                        : [savedUser]

                    // Save the updated facility with users
                    await queryRunner.manager.save(savedFacility)
                }
            }
            // add the current user to the facility users
            savedFacility.users = [...savedFacility.users, req.user as User]
            await queryRunner.manager.save(savedFacility)
            // also add the newly created facility to the user facility column
            const _user = { ...req.user, facility: savedFacility }
            await queryRunner.manager.update(User, { id: req.user.id }, _user as User)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Remove users from response to avoid circular dependencies
            delete savedFacility.users

            // Send success response
            res.status(201).json({
                message: "Facility created successfully",
                data: savedFacility,
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
    static async updateFacility(req: Request, res: Response) {
        const facilityId = req.params.id
        const queryRunner = AppDataSource.createQueryRunner()
        // Start the transaction
        await queryRunner.startTransaction()
        try {
            const body = await updateFacilityValidationSchema.parseAsync(req.body)
            const facility = await Facility.findOne({
                where: { id: facilityId },
                relations: { users: true },
            })
            if (!facility) {
                throw new Error(`No facility found for the provided ID`)
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
                    _user.facility = facility

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
            Object.assign(facility, body) // Update facility with new values
            facility.users.concat(allCreatedUsers)
            await queryRunner.manager.save(Facility, facility)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Send success response
            res.status(200).json({
                message: "Facility updated successfully",
                data: facility,
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
    static async getFacilityUsers(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            throw new Error(`ID is required to find facility users`)
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
        const count = await userBuilder.where([{ facility: { id } }]).getCount()
        if (pagination) {
            delete req.query["pagination"]
            delete req.query["limit"]
            delete req.query["page"]
            const results = await userBuilder
                .where([{ facility: { id } }])
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
                where: [{ facility: { id } }],
            })
            res.status(200).json({ data: users })
        }
    }
}
