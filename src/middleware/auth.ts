import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { User } from "../entity/user/User.entity"
import { Role } from "../enum/role.enum"
import { Subsidiary } from "../entity/organization/Subsidiary.entity"
import { Facility } from "../entity/organization/Facility.entity"

export const isLoggedIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers?.["authorization"] && req.headers["authorization"]?.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                res.status(401)
                throw new Error(`Unauthorized, no token found`)
            } else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
                const user = await User.findOne({
                    where: { id: decodedToken.id },
                    relations: { organization: true, subsidiary: true, facility: true },
                })
                if (user) {
                    req.user = user
                } else {
                    res.status(401)
                    throw new Error(`User not found`)
                }
            }
            next()
        } catch {
            res.status(401)
            throw new Error(`Unauthorized, token failed`)
        }
    } else {
        res.status(401)
        throw new Error(`Unauthorized, token failed`)
    }
})

export const isSuperAdmin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user?.role === Role.SUPER_ADMIN) {
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorized! Access Denied.")
        }
    },
)

export const isSuperAdminForTheRequestedOrganization = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (
            req.user &&
            req.user?.role === Role.SUPER_ADMIN &&
            req.user?.organization?.id === req.params?.id
        ) {
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorized! Access Denied.")
        }
    },
)

export const isEnvistride = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.role === Role.ENVISTRIDE) {
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorized! Access Denied.")
        }
    },
)

export const isSuperAdminOrAdminForTheRequestedOrganization = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const subsidiary = await Subsidiary.findOne({
            where: { id: req.params.id },
            relations: { parent: true, facility: true },
        })
        const isAllowed =
            (req.user?.organization?.id === subsidiary?.parent?.id ||
                req.user?.subsidiary?.id === subsidiary?.id) &&
            (req.user?.role === Role.SUPER_ADMIN || req.user.role === Role.ADMIN)
        if (isAllowed) {
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorized! Access Denied.")
        }
    },
)

export const isSuperAdminOrFacilityAdminForTheRequestedOrganization = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const facility = await Facility.findOne({
            where: { id: req.params.id },
            relations: { parent: true, subsidiary: true },
        })
        const isAllowed =
            (req.user?.organization?.id === facility?.parent?.id ||
                req.user?.facility?.id === facility?.id) &&
            (req.user?.role === Role.SUPER_ADMIN || req.user.role === Role.FAC_ADMIN)
        if (isAllowed) {
            next()
        } else {
            res.status(401)
            throw new Error("Unauthorized! Access Denied.")
        }
    },
)

export const isProviderOrHigherAuthority = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const roles = [
        Role.ADMIN,
        Role.SUPER_ADMIN,
        Role.FAC_ADMIN,
        Role.PROVIDER,
        Role.VALIDATOR,
        Role.USER,
        Role.ENVISTRIDE,
    ]
    if (roles.includes(req.user.role as Role)) {
        next()
    } else {
        res.status(401)
        throw new Error("Unauthorized! Access Denied.")
    }
}

export const isValidator = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === Role.VALIDATOR || req.user?.role === Role.ENVISTRIDE) {
        next()
    } else {
        res.status(401)
        throw new Error("Unauthorized! Access Denied.")
    }
}

export const optionalLoggedIn = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers?.["authorization"] && req.headers["authorization"]?.startsWith("Bearer")) {
            try {
                const token = req.headers.authorization.split(" ")[1]
                if (token) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { id: string }
                    const user = await User.findOne({
                        where: { id: decodedToken.id },
                        relations: { organization: true, subsidiary: true, facility: true },
                    })
                    if (user) {
                        req.user = user
                    }
                }
            } finally {
                next()
            }
        } else {
            next()
        }
    },
)

export const isLoggedInOrSuperAdminUpdatingUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id: userIdToUpdate } = req.params // The ID of the user being updated
        const loggedInUser = req.user // req.user is populated by previous middleware (e.g., isLoggedIn)

        if (!loggedInUser) {
            res.status(401)
            throw new Error("Unauthorized: No logged-in user found")
        }

        // Fetch the user being updated to check their organization, subsidiary, or facility
        const userToUpdate = await User.findOne({
            where: { id: userIdToUpdate },
            relations: ["organization", "subsidiary", "facility"],
        })

        if (!userToUpdate) {
            res.status(404)
            throw new Error("User not found")
        }

        const sameOrganization = loggedInUser.organization?.id === userToUpdate.organization?.id
        const sameSubsidiary = loggedInUser.subsidiary?.id === userToUpdate.subsidiary?.id
        const sameFacility = loggedInUser.facility?.id === userToUpdate.facility?.id

        // Authorization checks
        const isAuthorized =
            loggedInUser.id === userIdToUpdate || // The user is updating their own info
            (loggedInUser.role === Role.SUPER_ADMIN && // The user is a SUPER_ADMIN and belongs to the same organization
                (sameOrganization || sameSubsidiary || sameFacility))

        if (isAuthorized) {
            return next()
        }

        res.status(403)
        throw new Error(
            "Forbidden: Only the user or an authorized SUPER_ADMIN can perform this action",
        )
    },
)
