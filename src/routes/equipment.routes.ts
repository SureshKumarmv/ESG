import { EquipmentTypeController } from "./../controllers/equipment/equipment-type.controller"
import * as express from "express"

const Router = express.Router()

Router.get("/", EquipmentTypeController.getEquipments)
Router.get("/ghg", EquipmentTypeController.getGhgEquipments)
export { Router as equipmentRouter }
