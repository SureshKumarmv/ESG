import asyncHandler from "express-async-handler"
import * as express from "express"
import {
    isLoggedIn,
    isSuperAdmin,
    isSuperAdminOrFacilityAdminForTheRequestedOrganization,
} from "../middleware/auth"
import { FacilityController } from "../controllers/organization/facility.controller"

const Router = express.Router()

Router.route("/").post(isLoggedIn, isSuperAdmin, asyncHandler(FacilityController.createFacility))
Router.route("/:id")
    .get(
        isLoggedIn,
        isSuperAdminOrFacilityAdminForTheRequestedOrganization,
        asyncHandler(FacilityController.getFacility),
    )
    .patch(
        isLoggedIn,
        isSuperAdminOrFacilityAdminForTheRequestedOrganization,
        asyncHandler(FacilityController.updateFacility),
    )

Router.route("/:id/users").get(
    isLoggedIn,
    isSuperAdminOrFacilityAdminForTheRequestedOrganization,
    asyncHandler(FacilityController.getFacilityUsers),
)
export { Router as facilityRouter }
