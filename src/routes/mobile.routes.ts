import * as express from "express"
import { isLoggedIn } from "../middleware/auth"
import { MobileDefraController } from "../controllers/mobileDefra/mobileEmission.controller"

const Router = express.Router()

// Router.route("/defra/activity").get(isLoggedIn, MobileDefraController.getMobileDefraActivites)
Router.route("/defra/activity").get(MobileDefraController.getMobileDefraActivites)

// Router.route("/defra/result")
//     .get(isLoggedIn, MobileDefraController.getMobileDefraResult)
//     .post(isLoggedIn, MobileDefraController.postMobileDefraResult)
Router.route("/defra/result")
    .get(MobileDefraController.getMobileDefraResult)
    .post(MobileDefraController.postMobileDefraResult)

// Router.route("/defra/vehicle").get(isLoggedIn, MobileDefraController.getMobileDefraVehicle)
Router.route("/defra/vehicle").get(MobileDefraController.getMobileDefraVehicle)

Router.get("/defra/vehicle/:id", MobileDefraController.getMobileDefraVehicleByActivityId)

// Router.route("/defra/vehicleVariant").get(
//     isLoggedIn,
//     MobileDefraController.getMobileDefraVehicleVariant,
// )
Router.route("/defra/vehicleVariant").get(MobileDefraController.getMobileDefraVehicleVariant)

Router.get(
    "/defra/vehicleVariant/:id",
    MobileDefraController.getMobileDefraVehicleVariantByVehicleId,
)
//------------------Delivery start---------------------

// Router.route("/defra/deliveryActivity").get(
//     isLoggedIn,
//     MobileDefraController.getMobileDeliveryActivity,
// )
Router.route("/defra/deliveryActivity").get(MobileDefraController.getMobileDeliveryActivity)

// Router.route("/defra/deliveryResult")
//     .get(isLoggedIn, MobileDefraController.getMobileDeliveryResult)
//     .post(isLoggedIn, MobileDefraController.postMobileDeliveryResult)
Router.route("/defra/deliveryResult")
    .get(MobileDefraController.getMobileDeliveryResult)
    .post(MobileDefraController.postMobileDeliveryResult)

// Router.route("/defra/deliveryTypes").get(isLoggedIn, MobileDefraController.getMobileDeliveryTypes)
Router.route("/defra/deliveryTypes").get(MobileDefraController.getMobileDeliveryTypes)

// Router.route("/defra/deliveryVariant").get(
//     isLoggedIn,
//     MobileDefraController.getMobileDeliveryVariant,
// )
Router.route("/defra/deliveryVariant").get(MobileDefraController.getMobileDeliveryVariant)

//--------------------Delivery end---------------------

//--------------------SECR start-----------------------

Router.route("/defra/activitySECR").get(
    isLoggedIn,
    MobileDefraController.getMobileSECRActivityDefra,
)

Router.route("/defra/fuelFactorSECR").get(
    isLoggedIn,
    MobileDefraController.getMobileSECRDefraFuelFactor,
)

Router.route("/defra/vehicleSECR").get(isLoggedIn, MobileDefraController.getMobileSECRDefraVehicle)

Router.route("/defra/vehicleVariantSECR").get(
    isLoggedIn,
    MobileDefraController.getMobileSECRDefraVehicleVariant,
)

//-------------------------SECR end---------------------

export { Router as mobileRouter }
