import * as express from "express"
import { EstimationController } from "../controllers/estimation/emission.controller"

const Router = express.Router()

Router.route("/emissions").post(EstimationController.calculateEmission)
export { Router as estimationRouter }
