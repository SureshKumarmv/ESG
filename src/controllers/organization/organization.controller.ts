import { Request, Response } from "express"
import { createOrganizationSchema, updateOrganizationSchema } from "../../validations/organization"
import { Organization } from "../../entity/organization/Organization.entity"
import { User } from "../../entity/user/User.entity"
import { generatePassword, sendWelcomeEmail } from "../../utils/helpers"
import { AppDataSource } from "../../data-source" // Import your data source
import { AnyObject } from "../../types/common"

export class OrganizationController {
    static async getOrganization(req: Request, res: Response) {
        const organization = await Organization.findOne({
            where: { id: req.params.id },
            relations: {
                users: true,
                subsidiary: { facility: true },
                facility: true,
            },
        })
        res.status(200).json({ data: organization })
    }
    static async createOrganization(req: Request, res: Response) {
        const queryRunner = AppDataSource.createQueryRunner()

        // Start the transaction
        await queryRunner.startTransaction()

        try {
            const body = await createOrganizationSchema.parseAsync(req.body)

            // Create a new organization instance and save it in the transaction
            const organization = new Organization()
            Object.assign(organization, { ...body, users: [] })
            const savedOrganization = await queryRunner.manager.save(organization)

            // Create users if body contains organization users
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
                    _user.organization = savedOrganization

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
                    savedOrganization.users = savedOrganization.users?.length
                        ? [...savedOrganization.users, savedUser]
                        : [savedUser]

                    // Save the updated organization with users
                    await queryRunner.manager.save(savedOrganization)
                }
            }
            // add the current user to the organization users
            savedOrganization.users = [...savedOrganization.users, req.user as User]
            await queryRunner.manager.save(savedOrganization)
            // also add the current user to the organization
            const _user = { ...req.user, organization: savedOrganization }
            await queryRunner.manager.update(User, { id: req.user.id }, _user as User)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Remove users from response to avoid circular dependencies
            delete savedOrganization.users
            // Send success response
            res.status(201).json({
                message: "Organization created successfully",
                data: savedOrganization,
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
    static async updateOrganization(req: Request, res: Response) {
        const organizationId = req.params.id
        const queryRunner = AppDataSource.createQueryRunner()
        // Start the transaction
        await queryRunner.startTransaction()
        try {
            const body = await updateOrganizationSchema.parseAsync(req.body)
            const organization = await Organization.findOne({
                where: { id: organizationId },
                relations: { users: true },
            })
            if (!organization) {
                throw new Error(`No organization found for the provided ID`)
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
                    _user.organization = organization

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
            Object.assign(organization, body) // Update organization with new values
            organization.users.concat(allCreatedUsers)
            await queryRunner.manager.save(Organization, organization)
            // Commit the transaction
            await queryRunner.commitTransaction()
            // Send success response
            res.status(200).json({
                message: "Organization updated successfully",
                data: organization,
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
    static async getOrganizationUsers(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            throw new Error(`ID is required to find organization users`)
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
        const count = await userBuilder.where([{ organization: { id } }]).getCount()
        if (pagination) {
            delete req.query["pagination"]
            delete req.query["limit"]
            delete req.query["page"]
            const results = await userBuilder
                .where([{ organization: { id } }])
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
                where: [{ organization: { id } }],
            })
            res.status(200).json({ data: users })
        }
    }
}
