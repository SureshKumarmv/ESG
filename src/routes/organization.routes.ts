import asyncHandler from "express-async-handler"
import * as express from "express"
import { OrganizationController } from "../controllers/organization/organization.controller"
import {
    isLoggedIn,
    isSuperAdmin,
    isSuperAdminForTheRequestedOrganization,
} from "../middleware/auth"

const Router = express.Router()

Router.route("/").post(
    isLoggedIn,
    isSuperAdmin,
    asyncHandler(OrganizationController.createOrganization),
)
Router.route("/:id")
    .get(
        isLoggedIn,
        isSuperAdminForTheRequestedOrganization,
        asyncHandler(OrganizationController.getOrganization),
    )
    .patch(
        isLoggedIn,
        isSuperAdminForTheRequestedOrganization,
        asyncHandler(OrganizationController.updateOrganization),
    )
Router.route("/:id/users").get(
    isLoggedIn,
    isSuperAdminForTheRequestedOrganization,
    asyncHandler(OrganizationController.getOrganizationUsers),
)

export { Router as organizationRouter }
