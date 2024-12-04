import { isLoggedIn, isProviderOrHigherAuthority } from "./../middleware/auth"
import * as express from "express"
import { GasController } from "../controllers/ghg/ghg-gas.controllers"
import { GhgEmissionController } from "../controllers/ghg/emissions.controller"

const Router = express.Router()

Router.get("/gases", isLoggedIn, GasController.getAllGases)
Router.get("/gases/:id", isLoggedIn, GasController.getGasById)
Router.route("/emissions")
    .get(isLoggedIn, GhgEmissionController.getAllEmissions)
    .post(isLoggedIn, isProviderOrHigherAuthority, GhgEmissionController.calculateEmission)
Router.route("/emissions/:id")
    .get(isLoggedIn, GhgEmissionController.getEmissionById)
    .put(isLoggedIn, isProviderOrHigherAuthority, GhgEmissionController.updateEmission)
export { Router as ghgRouter }
