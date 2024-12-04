import { AppDataSource } from "./data-source"
import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import { Request, Response } from "express"
import { epaRouter } from "./routes/epa.routes"
import cors from "cors"
import "reflect-metadata"
import { defraRouter } from "./routes/defra.routes"
import { activityRouter } from "./routes/activity.routes"
import { equipmentRouter } from "./routes/equipment.routes"
import { resultRouter } from "./routes/result.routes"
import { ghgRouter } from "./routes/ghg.routes"
import { estimationRouter } from "./routes/estimation.routes"
import { demoRouter } from "./routes/demo.routes"
import { userRouter } from "./routes/user.routes"
import { errorHandler } from "./middleware/error-handler"
import { organizationRouter } from "./routes/organization.routes"
import { subsidiaryRouter } from "./routes/subsidiary.routes"
import { facilityRouter } from "./routes/facility.routes"
import { transformMiddleware } from "./middleware/response-interceptor"
import "./utils/worker"
import { uploadRouter } from "./routes/upload.routes"
import { stationaryRouter } from "./routes/stationary.routes"
import { mobileRouter } from "./routes/mobile.routes"
// import { mobileRouter } from "./routes/mobile.routes"
// import { mobileDefraResult } from "./routes/mobileDefraResult.routes"

dotenv.config()

const app = express()
app.use(express.json())
const { PORT = 3000 } = process.env
app.use(morgan("dev"))
app.use(cors())
app.use(transformMiddleware)
app.use("/api/epa", epaRouter)
app.use("/api/defra", defraRouter)
app.use("/api/ghg", ghgRouter)
app.use("/api/estimation", estimationRouter)
app.use("/api/activity", activityRouter)
app.use("/api/results", resultRouter)
app.use("/api/equipment", equipmentRouter)
app.use("/api/demo", demoRouter)
app.use("/api/user", userRouter)
app.use("/api/organization", organizationRouter)
app.use("/api/subsidiary", subsidiaryRouter)
app.use("/api/facility", facilityRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/stationary", stationaryRouter)

app.use("/api/mobile", mobileRouter)
app.use(errorHandler)
app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" })
})

AppDataSource.initialize()
    .then(async () => {
        if (process.env.NODE_ENV === "production") {
            await AppDataSource.runMigrations()
        }
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT)
        })
        console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))
