import asyncHandler from "express-async-handler"
import * as express from "express"
import {
    isLoggedIn,
    isSuperAdmin,
    isSuperAdminOrAdminForTheRequestedOrganization,
} from "../middleware/auth"
import { SubsidiaryController } from "../controllers/organization/subsidiary.controller"

const Router = express.Router()

Router.route("/").post(
    isLoggedIn,
    isSuperAdmin,
    asyncHandler(SubsidiaryController.createSubsidiary),
)
Router.route("/:id")
    .get(
        isLoggedIn,
        isSuperAdminOrAdminForTheRequestedOrganization,
        asyncHandler(SubsidiaryController.getSubsidiary),
    )
    .patch(
        isLoggedIn,
        isSuperAdminOrAdminForTheRequestedOrganization,
        asyncHandler(SubsidiaryController.updateSubsidiary),
    )
Router.route("/:id/users").get(
    isLoggedIn,
    isSuperAdminOrAdminForTheRequestedOrganization,
    asyncHandler(SubsidiaryController.getSubsidiaryUsers),
)

export { Router as subsidiaryRouter }
