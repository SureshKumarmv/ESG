import { isLoggedIn } from "./../middleware/auth"
import express from "express"
import expressAsyncHandler from "express-async-handler"
import { UploadController } from "../controllers/upload/upload.controller"
const Router = express.Router()

Router.route("/").post(isLoggedIn, expressAsyncHandler(UploadController.generateSasUrl))
export { Router as uploadRouter }
