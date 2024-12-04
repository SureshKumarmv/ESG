import { isProviderOrHigherAuthority } from "./../middleware/auth"
import * as express from "express"
import { GasController } from "../controllers/epa/epa-gas.controllers"
import { EmissionController } from "../controllers/epa/emissions.controller"
import expressAsyncHandler from "express-async-handler"
import { isLoggedIn } from "../middleware/auth"

const Router = express.Router()

Router.get("/gases", isLoggedIn, expressAsyncHandler(GasController.getAllGases))
Router.get("/gases/:id", isLoggedIn, GasController.getGasById)
Router.route("/emissions")
    .get(isLoggedIn, EmissionController.getAllEmissions)
    .post(isLoggedIn, isProviderOrHigherAuthority, EmissionController.calculateEmission)
Router.route("/emissions/:id")
    .get(isLoggedIn, EmissionController.getEmissionById)
    .put(isLoggedIn, isProviderOrHigherAuthority, EmissionController.updateEmission)
export { Router as epaRouter }
