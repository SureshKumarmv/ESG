import * as express from "express"
import expressAsyncHandler from "express-async-handler"
import { FuelController } from "../controllers/stationary/defra/fuel.controller"
import { StationaryEmissionController } from "../controllers/stationary/defra/emission.controller"
import { isLoggedIn, isValidator } from "../middleware/auth"
import { ExportResultController } from "../controllers/export/export-result.controller"

const Router = express.Router()

Router.route("/defra/fuels").get(expressAsyncHandler(FuelController.getAllFuels))
Router.route("/defra/export").get(
    expressAsyncHandler(ExportResultController.exportStationaryDefraData),
)
Router.route("/defra/fuels/:id").get(expressAsyncHandler(FuelController.getFueldById))
Router.route("/defra/emissions").get(
    expressAsyncHandler(StationaryEmissionController.getAllEmissions),
)
Router.route("/defra/result")
    .get(isLoggedIn, expressAsyncHandler(StationaryEmissionController.getResults))
    .post(isLoggedIn, expressAsyncHandler(StationaryEmissionController.calculateResult))
Router.route("/defra/result/:id").put(
    isLoggedIn,
    expressAsyncHandler(StationaryEmissionController.updatedAndCalculateResult),
)
Router.route("/defra/validate").post(
    isLoggedIn,
    expressAsyncHandler(StationaryEmissionController.validateData),
)
Router.post(
    "/defra/add-remarks/:id",
    isLoggedIn,
    isValidator,
    StationaryEmissionController.addRemarks,
)

export { Router as stationaryRouter }
