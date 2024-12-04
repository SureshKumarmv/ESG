import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path"
import * as dotenv from "dotenv"
import { EpaGas } from "./entity/epa/Gas.entity"
import { EpaEmission } from "./entity/epa/Emission.entity"
import { DefraEmission } from "./entity/defra/DefraEmission.entity"
import { DefraGas } from "./entity/defra/DefraGas.entity"
import { Activity } from "./entity/defra/Activity.entity"
import { EquipmentType } from "./entity/equipment-type/EquipmentType.entity"
import { Result } from "./entity/results/Results.entity"
import { GhgEmission } from "./entity/ghg/GhgEmission.entity"
import { GhgGas } from "./entity/ghg/Ghg.entity"
import { GhgEquipmentType } from "./entity/equipment-type/GhgEquipment.entity"
import { Demo } from "./entity/book-demo/Demo.entity"
import { User } from "./entity/user/User.entity"
import { Organization } from "./entity/organization/Organization.entity"
import { Subsidiary } from "./entity/organization/Subsidiary.entity"
import { Facility } from "./entity/organization/Facility.entity"
import { StationaryDefraActivity } from "./entity/stationary/StationaryDefraActivity.entity"
import { StationaryDefraFuel } from "./entity/stationary/StationaryDefraFuel.entity"
import { StationaryDefraEmission } from "./entity/stationary/StationaryDefraEmission.entity"
import { StationaryDefraResult } from "./entity/stationary/StationaryDefraResult.entity"

import { MobileActivityDefra } from "./entity/mobile/MobileActivityDefra.entity"
import { MobileEvDefraFactor } from "./entity/mobile/MobileDefraEv.entity"
import { MobileDefraKWH } from "./entity/mobile/MobileDefraKWH.entity"
import { MobileDefraResult } from "./entity/mobile/MobileDefraResult.entity"
import { MobileVehicleDefra } from "./entity/mobile/MobileVehicleDefra.entity"
import { MobileVehicleEmissionDefra } from "./entity/mobile/MobileVehicleEmission.entity"
import { MobileVehicleVariantDefra } from "./entity/mobile/MobileVehicleVariantDefra.entity"
import { MobileDeliveryActivity } from "./entity/mobileDelivery/MobileDeliveryActivity.entity"
import { MobileDeliveryEmission } from "./entity/mobileDelivery/MobileDeliveryEmission.entity"
import { MobileDeliveryResult } from "./entity/mobileDelivery/MobileDeliveryResult.entity"
import { MobileDeliveryTypes } from "./entity/mobileDelivery/MobileDeliveryTypes.entity"
import { MobileDeliveryVariant } from "./entity/mobileDelivery/MobileDeliveryVariant.entity"
import { MobileSECRActivityDefra } from "./entity/mobileSECRDefra/MobileSECRActivityDefra.entity"
import { MobileVehicleSECREmissionDefra } from "./entity/mobileSECRDefra/MobileSECRDefraEmission.entity"
import { MobileSECRFuelFactorDefra } from "./entity/mobileSECRDefra/MobileSECRFuelFactorDefra.entity"
import { MobileDefraSECRResult } from "./entity/mobileSECRDefra/MobileSECRResultDefra.entity"
import { MobileSECRVehicleDefra } from "./entity/mobileSECRDefra/MobileSECRVehicleDefra.entity"
import { MobileVehicleVariantSECRDefra } from "./entity/mobileSECRDefra/MobileSECRVehicleVariantDefra.entity"

dotenv.config()

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    logging: NODE_ENV === "dev" ? true : false,
    entities: [
        EpaGas,
        EpaEmission,
        Result,
        DefraEmission,
        DefraGas,
        Activity,
        EquipmentType,
        GhgEquipmentType,
        GhgEmission,
        GhgGas,
        Demo,
        User,
        Organization,
        Subsidiary,
        Facility,
        StationaryDefraActivity,
        StationaryDefraFuel,
        StationaryDefraEmission,
        StationaryDefraResult,

        MobileActivityDefra,
        MobileEvDefraFactor,
        MobileDefraKWH,
        MobileDefraResult,
        MobileVehicleDefra,
        MobileVehicleEmissionDefra,
        MobileVehicleVariantDefra,
        MobileDeliveryActivity,
        MobileDeliveryEmission,
        MobileDeliveryResult,
        MobileDeliveryTypes,
        MobileDeliveryVariant,
        MobileSECRActivityDefra,
        MobileVehicleSECREmissionDefra,
        MobileSECRFuelFactorDefra,
        MobileDefraSECRResult,
        MobileSECRVehicleDefra,
        MobileVehicleVariantSECRDefra,
    ],
    migrations: [path.join(__dirname, "./migrations/*")],
    subscribers: [],
    maxQueryExecutionTime: 10000,
    ssl: false,
})
