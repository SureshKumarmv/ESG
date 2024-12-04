import asyncHandler from "express-async-handler"
import * as express from "express"
import { BookADemoController } from "../controllers/book-demo/book-demo.controller"
import { isEnvistride, isLoggedIn } from "../middleware/auth"
import { UserController } from "../controllers/user/user.controller"

const Router = express.Router()

Router.route("/")
    .get(isLoggedIn, isEnvistride, asyncHandler(BookADemoController.getResults))
    .post(asyncHandler(BookADemoController.postDemoForm))

Router.route("/generate-credentials").post(
    isLoggedIn,
    isEnvistride,
    asyncHandler(UserController.createUserBySubmittedForm),
)

export { Router as demoRouter }
