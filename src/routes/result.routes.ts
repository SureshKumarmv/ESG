import * as express from "express"
import { ResultController } from "../controllers/result/result.controller"
import { isLoggedIn, isValidator } from "../middleware/auth"
import expressAsyncHandler from "express-async-handler"
import { ExportResultController } from "../controllers/export/export-result.controller"

const Router = express.Router()

Router.get("/", isLoggedIn, ResultController.getResults)
    .get("/export", isLoggedIn, expressAsyncHandler(ExportResultController.exportData))
    .get("/gas-wise-total", isLoggedIn, expressAsyncHandler(ResultController.getTotalResultGasWise))
    .post("/add-remarks/:id", isLoggedIn, isValidator, ResultController.addRemarks)
    .post("/validate", isLoggedIn, isValidator, ResultController.validateData)
export { Router as resultRouter }
