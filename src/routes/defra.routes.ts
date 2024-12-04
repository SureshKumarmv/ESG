import { isLoggedIn, isProviderOrHigherAuthority } from "./../middleware/auth"
import * as express from "express"
import { DefraEmissionController } from "../controllers/defra/emissions.controller"
import { DefraGasController } from "../controllers/defra/defra-gas.controller"

const Router = express.Router()

Router.get("/gases", isLoggedIn, DefraGasController.getAllGases)
Router.route("/emissions")
    .get(isLoggedIn, DefraEmissionController.getAllEmissions)
    .post(isLoggedIn, isProviderOrHigherAuthority, DefraEmissionController.calculateEmission)
Router.route("/emissions/:id")
    .get(isLoggedIn, DefraEmissionController.getEmissionById)
    .put(isLoggedIn, isProviderOrHigherAuthority, DefraEmissionController.updateEmission)
export { Router as defraRouter }
