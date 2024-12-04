import { isLoggedIn, isLoggedInOrSuperAdminUpdatingUser } from "./../middleware/auth"
import asyncHandler from "express-async-handler"
import express from "express"
import { UserController } from "../controllers/user/user.controller"
import { optionalLoggedIn } from "../middleware/auth"

const Router = express.Router()

Router.route("/login").post(asyncHandler(UserController.loginUser))
Router.route("/send-otp").post(optionalLoggedIn, asyncHandler(UserController.sendOtp))
Router.route("/reset-password").post(asyncHandler(UserController.resetPassword))
Router.route("/:id").put(
    isLoggedIn,
    isLoggedInOrSuperAdminUpdatingUser,
    asyncHandler(UserController.updateUser),
)
export { Router as userRouter }
