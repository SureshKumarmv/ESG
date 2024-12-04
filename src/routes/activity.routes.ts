import * as express from "express"
import { ActivityController } from "../controllers/activity/activity.controller"

const Router = express.Router()

Router.get("/", ActivityController.getActivites)
export { Router as activityRouter }
