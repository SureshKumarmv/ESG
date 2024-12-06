import { Request, Response } from "express"
import { MobileActivityDefra } from "../../entity/mobile/MobileActivityDefra.entity"
import { convertLength } from "../../utils/conversion"
import { MobileDefraResult } from "../../entity/mobile/MobileDefraResult.entity"
import { MobileVehicleDefra } from "../../entity/mobile/MobileVehicleDefra.entity"
import { MobileVehicleVariantDefra } from "../../entity/mobile/MobileVehicleVariantDefra.entity"
import { MobileVehicleEmissionDefra } from "../../entity/mobile/MobileVehicleEmission.entity"
import { MobileEvDefraFactor } from "../../entity/mobile/MobileDefraEv.entity"
import { MobileDeliveryActivity } from "../../entity/mobileDelivery/MobileDeliveryActivity.entity"
import { MobileDeliveryEmission } from "../../entity/mobileDelivery/MobileDeliveryEmission.entity"
import { MobileDeliveryResult } from "../../entity/mobileDelivery/MobileDeliveryResult.entity"
import { MobileDeliveryTypes } from "../../entity/mobileDelivery/MobileDeliveryTypes.entity"
import { MobileDeliveryVariant } from "../../entity/mobileDelivery/MobileDeliveryVariant.entity"
import { MobileSECRActivityDefra } from "../../entity/mobileSECRDefra/MobileSECRActivityDefra.entity"
import { MobileSECRVehicleDefra } from "../../entity/mobileSECRDefra/MobileSECRVehicleDefra.entity"
import { MobileSECRFuelFactorDefra } from "../../entity/mobileSECRDefra/MobileSECRFuelFactorDefra.entity"
import { MobileVehicleVariantSECRDefra } from "../../entity/mobileSECRDefra/MobileSECRVehicleVariantDefra.entity"
import { MobileDeliveryLoadEmission } from "../../entity/mobileDelivery/mobileDeliveryLoad.entity"
// import { Load } from "../../enum/Load.enum"

export class MobileDefraController {
    // ----------------------------Passenger starts----------------------------------------
    static async getMobileDefraActivites(req: Request, res: Response) {
        try {
            const mobileDefraActivity = await MobileActivityDefra.find({ where: { ...req.query } })
            return res.status(200).json({ data: mobileDefraActivity })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async postMobileDefraResult(req: Request, res: Response) {
        const {
            electricVehicleType,
            year,
            consumer,
            startDate,
            endDate,
            activity,
            type,
            vehicle,
            vehicleVariant,
            consumption,
            unit,
            // ghgProtocol,
        } = req.body
        try {
            const activityVal = await MobileActivityDefra.find({ where: { id: activity } })
            const vehicleVal = await MobileVehicleDefra.find({ where: { id: vehicle } })
            const variantVal = await MobileVehicleVariantDefra.find({
                where: { id: vehicleVariant },
            })
            const kmValue = convertLength(consumption, unit, "Kilometres")
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error("Invalid date format")
            }
            const differenceInMs = end.getTime() - start.getTime()
            const millisecondsPerDay = 24 * 60 * 60 * 1000
            const daysDifference = Math.floor(differenceInMs / millisecondsPerDay)

            const defraResult = new MobileDefraResult()
            defraResult.activity = activityVal[0].name
            defraResult.vehicle = vehicleVal[0].name
            defraResult.consumer = consumer
            defraResult.year = year
            // defraResult.ghgProtocolScope = ghgProtocol
            defraResult.ghgProtocolScope = "Scope1"
            defraResult.startDate = startDate
            defraResult.endDate = endDate
            defraResult.variant = variantVal[0].name
            defraResult.unit = unit
            defraResult.consumption = consumption
            defraResult.noOfDays = daysDifference

            if (type === "FuelVehicle") {
                const emissionFactor = await MobileVehicleEmissionDefra.find({
                    where: [
                        // { vehicleId: vehicle, variantId: vehicleVariant, unit: "Km", year: year }, to be corrected later
                    ],
                })

                const co2efactor = emissionFactor[0].kgco2e
                const co2factor = emissionFactor[0].kgco2eCO2
                const ch4factor = emissionFactor[0].kgco2eCH4
                const n2ofactor = emissionFactor[0].kgco2eN2O

                const output = Number(co2efactor) * Number(kmValue)
                const co2Output = Number(co2factor) * Number(kmValue)
                const ch4Output = Number(ch4factor) * Number(kmValue)
                const n2oOutput = Number(n2ofactor) * Number(kmValue)

                const roundedResult = parseFloat(output.toFixed(3))
                const roundedResultCO2 = parseFloat(co2Output.toFixed(3))
                const roundedResultCH4 = parseFloat(ch4Output.toFixed(3))
                const roundedResultN2O = parseFloat(n2oOutput.toFixed(3))

                defraResult.type = type
                defraResult.CO2output = roundedResultCO2
                defraResult.CH4output = roundedResultCH4
                defraResult.N2Ooutput = roundedResultN2O
                defraResult.result = roundedResult

                const savedResult = await defraResult.save()
                return res.status(200).json({ data: savedResult })
            } else if (type === "PHEV") {
                //pending phev calculations

                const emissionFactor = await MobileVehicleEmissionDefra.find({
                    where: [
                        // { vehicleId: vehicle, variantId: vehicleVariant, unit: "Km", year: year }, // to be corrected
                    ],
                })

                const fuelEmissionFactor = emissionFactor[0].kgco2e
                const fuelPercentage = 40
                const evPercentage = 60

                const contributionByFuel =
                    Number(fuelEmissionFactor) * Number(kmValue) * Number(fuelPercentage / 100)

                const evEmissionValue = await MobileEvDefraFactor.find({
                    where: [{ name: electricVehicleType, year: year }],
                })

                const evEmissionFactor = evEmissionValue[0].kgco2e
                // const evEmissionFactorCO2 = evEmissionValue[0].kgco2eCO2
                // const evEmissionFactorCH4 = evEmissionValue[0].kgco2eCH4
                // const evEmissionFactorN2O = evEmissionValue[0].kgco2eN2O

                const contributionByEv =
                    Number(evEmissionFactor) * Number(kmValue) * Number(evPercentage / 100)
                const result = Number(contributionByEv) + Number(contributionByFuel)

                const roundedResult = parseFloat(result.toFixed(3))

                // defraResult.fuelPercentage = fuelPercentage
                // defraResult.electricityPercentage = electricityPercentage
                defraResult.type = type
                defraResult.electricVehicleType = electricVehicleType
                defraResult.result = roundedResult

                const savedResult = await defraResult.save()

                return res.status(200).json({
                    data: savedResult,
                })
            } else if (type === "EV") {
                // ev code here
            }
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDefraResult(req: Request, res: Response) {
        try {
            const stationaryDefraResult = await MobileDefraResult.find({
                where: { ...req.query },
                // relations: ['activityVal', 'fuel'] // Include relations
            })
            return res.status(200).json({ data: stationaryDefraResult })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDefraVehicle(req: Request, res: Response) {
        try {
            const mobileyDefraVehicle = await MobileVehicleDefra.find({ where: { ...req.query } })
            return res.status(200).json({ data: mobileyDefraVehicle })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDefraVehicleVariant(req: Request, res: Response) {
        try {
            const mobileDefraVehicleVariant = await MobileVehicleVariantDefra.find({
                where: { ...req.query },
            })
            return res.status(200).json({
                data: mobileDefraVehicleVariant,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }
    // ----------------------------Passenger ends----------------------------------------

    // ----------------------------Delivery starts----------------------------------------
    static async getMobileDeliveryActivity(req: Request, res: Response) {
        try {
            const mobileDeliveryActivity = await MobileDeliveryActivity.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileDeliveryActivity,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async postMobileDeliveryResult(req: Request, res: Response) {
        const {
            year,
            consumer,
            // ghgProtocol,
            startDate,
            endDate,
            activity, //cars(by segment)
            types,
            variant, //
            distanceTravelled, //km
            unit,
            // noOfDays,
            fuelOrLaden,
        } = req.body

        try {
            const mobiledeliveryResult = new MobileDeliveryResult()
            const activityVal = await MobileDeliveryActivity.find({ where: { id: activity } })
            const activityOut = activityVal[0].name

            const typeVal = await MobileDeliveryTypes.find({ where: { id: types } })
            const typeout = typeVal[0].name

            const variantVal = await MobileDeliveryVariant.find({ where: { id: variant } })
            const variantout = variantVal[0].name

            const start = new Date(startDate)
            const end = new Date(endDate)
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error("Invalid date format")
            }
            const differenceInMs = end.getTime() - start.getTime()
            const millisecondsPerDay = 24 * 60 * 60 * 1000
            const daysDifference = Math.floor(differenceInMs / millisecondsPerDay)

            const distanceTravelledConversion = convertLength(distanceTravelled, unit, "Kilometres")

            let emission: unknown
            if (activity === "Vans") {
                emission = await MobileDeliveryEmission.find({
                    where: [{ variantId: variant, year: year, unit: "Km" }],
                })
            } else {
                emission = await MobileDeliveryLoadEmission.find({
                    where: [{ variantId: variant, year: year, laden: fuelOrLaden, unit: "Km" }],
                })
            }

            const emissionVal = emission[0].kgco2e
            const CO2eEissionVal = emission[0].kgco2eCO2
            const CH4EmissionVal = emission[0].kgco2eCH4
            const N2OEmissionVal = emission[0].kgco2eN2O

            const result = emissionVal * distanceTravelledConversion
            const CO2Result = CO2eEissionVal * distanceTravelledConversion
            const CH4Result = CH4EmissionVal * distanceTravelledConversion
            const N2OResult = N2OEmissionVal * distanceTravelledConversion

            const roundedResult = parseFloat(result.toFixed(3))
            const roundedCO2Result = parseFloat(CO2Result.toFixed(3))
            const roundedCH4Result = parseFloat(CH4Result.toFixed(3))
            const roundedN2OResult = parseFloat(N2OResult.toFixed(3))

            mobiledeliveryResult.year = year
            mobiledeliveryResult.consumer = consumer
            mobiledeliveryResult.ghgProtocolScope = "Scope1"
            mobiledeliveryResult.startDate = startDate
            mobiledeliveryResult.endDate = endDate
            mobiledeliveryResult.activity = activityOut
            mobiledeliveryResult.types = typeout
            mobiledeliveryResult.variant = variantout
            mobiledeliveryResult.distanceTravelled = distanceTravelled
            mobiledeliveryResult.unit = unit
            mobiledeliveryResult.noOfDays = daysDifference
            mobiledeliveryResult.result = roundedResult
            mobiledeliveryResult.CO2output = roundedCO2Result
            mobiledeliveryResult.CH4output = roundedCH4Result
            mobiledeliveryResult.N2Ooutput = roundedN2OResult

            const savedResult = await mobiledeliveryResult.save()
            return res.status(200).json({ data: savedResult })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDeliveryResult(req: Request, res: Response) {
        try {
            const stationaryDefraResult = await MobileDeliveryResult.find({
                where: { ...req.query },
                // relations: ['activityVal', 'fuel'] // Include relations
            })
            return res.status(200).json({
                data: stationaryDefraResult,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDeliveryTypes(req: Request, res: Response) {
        try {
            const mobileDeliveryActivity = await MobileDeliveryTypes.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileDeliveryActivity,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileDeliveryVariant(req: Request, res: Response) {
        try {
            const mobileDeliveryActivity = await MobileDeliveryVariant.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileDeliveryActivity,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }
    // ----------------------------Delivery end-------------------------------------------

    // ----------------------------SECR starts-------------------------------------------
    static async getMobileSECRActivityDefra(req: Request, res: Response) {
        try {
            const mobileEpaActivity = await MobileSECRActivityDefra.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileEpaActivity,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileSECRDefraVehicle(req: Request, res: Response) {
        try {
            const mobileSECRDefraaVehicle = await MobileSECRVehicleDefra.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileSECRDefraaVehicle,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileSECRDefraFuelFactor(req: Request, res: Response) {
        try {
            const mobileSECRDefraaVehicle = await MobileSECRFuelFactorDefra.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileSECRDefraaVehicle,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    static async getMobileSECRDefraVehicleVariant(req: Request, res: Response) {
        try {
            const mobileEpaActivity = await MobileVehicleVariantSECRDefra.find({
                where: { ...req.query },
            })

            return res.status(200).json({
                data: mobileEpaActivity,
            })
        } catch (error) {
            return res
                .status(400)
                .json({ message: error.message ? error.message : "Something went wrong" })
        }
    }

    // ----------------------------SECR ends---------------------------------------------
}
