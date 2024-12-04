import * as express from "express"
import { isLoggedIn } from "../middleware/auth"
import { MobileDefraController } from "../controllers/mobileDefra/mobileEmission.controller"

const Router = express.Router()

Router.route("/defra/activity").get(isLoggedIn, MobileDefraController.getMobileDefraActivites)

Router.route("/defra/result")
    .get(isLoggedIn, MobileDefraController.getMobileDefraResult)
    .post(isLoggedIn, MobileDefraController.postMobileDefraResult)

Router.route("/defra/vehicle").get(isLoggedIn, MobileDefraController.getMobileDefraVehicle)

Router.route("/defra/vehicleVariant").get(
    isLoggedIn,
    MobileDefraController.getMobileDefraVehicleVariant,
)

//------------------Delivery start---------------------

Router.route("/defra/deliveryActivity").get(
    isLoggedIn,
    MobileDefraController.getMobileDeliveryActivity,
)

Router.route("/defra/deliveryResult")
    .get(isLoggedIn, MobileDefraController.getMobileDeliveryResult)
    .post(isLoggedIn, MobileDefraController.postMobileDeliveryResult)

Router.route("/defra/deliveryTypes").get(isLoggedIn, MobileDefraController.getMobileDeliveryTypes)

Router.route("/defra/deliveryVariant").get(
    isLoggedIn,
    MobileDefraController.getMobileDeliveryVariant,
)

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
