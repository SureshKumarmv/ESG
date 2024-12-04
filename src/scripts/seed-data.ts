import { AppDataSource } from "../data-source"
import { Activity } from "../entity/defra/Activity.entity"
import { DefraEmission } from "../entity/defra/DefraEmission.entity"
import { DefraGas } from "../entity/defra/DefraGas.entity"
import { EpaEmission } from "../entity/epa/Emission.entity"
import { EpaGas } from "../entity/epa/Gas.entity"
import { EquipmentType } from "../entity/equipment-type/EquipmentType.entity"
import { GhgEquipmentType } from "../entity/equipment-type/GhgEquipment.entity"
import { GhgGas } from "../entity/ghg/Ghg.entity"
import { GhgEmission } from "../entity/ghg/GhgEmission.entity"
import { Result } from "../entity/results/Results.entity"
import fs from "fs"
import path from "path"

// Utility function to load JSON data
async function loadJSON(filePath: string) {
    const absolutePath = path.resolve(__dirname, filePath)
    const fileContent = fs.readFileSync(absolutePath, "utf-8")
    return JSON.parse(fileContent)
}

// Utility function to log messages
function logMessage(message: string) {
    const logFilePath = path.resolve(__dirname, "../log/log.txt")
    const logMessage = `${new Date().toISOString()} - ${message}\n`
    fs.appendFileSync(logFilePath, logMessage, "utf-8")
}

// Utility function to clear log messages
function clearLogMessage() {
    const logFilePath = path.resolve(__dirname, "../log/log.txt")
    fs.writeFile(logFilePath, "", {}, (err) => console.log(err))
}

// Main function to insert data
async function insertData() {
    try {
        // clear existing logs
        clearLogMessage()

        logMessage("Initializing database connection...")
        await AppDataSource.initialize()
        logMessage("Database connection established.")

        // Repositories
        const epaGasRepository = AppDataSource.getRepository(EpaGas)
        const defraGasRepository = AppDataSource.getRepository(DefraGas)
        const ghgGasRepository = AppDataSource.getRepository(GhgGas)
        const activityRepository = AppDataSource.getRepository(Activity)
        const epaEmissionRepository = AppDataSource.getRepository(EpaEmission)
        const defraEmissionRepository = AppDataSource.getRepository(DefraEmission)
        const ghgEmissionRepository = AppDataSource.getRepository(GhgEmission)
        const resultRepository = AppDataSource.getRepository(Result)
        const equipmentRepository = AppDataSource.getRepository(EquipmentType)
        const ghgEquipmentRepository = AppDataSource.getRepository(GhgEquipmentType)

        // Clear existing data
        logMessage("Clearing existing data...")
        await resultRepository.delete({})
        logMessage("Cleared EPA results.")
        await epaEmissionRepository.delete({})
        logMessage("Cleared EPA emissions.")
        await ghgEmissionRepository.delete({})
        logMessage("Cleared GHG emissions.")
        await defraEmissionRepository.delete({})
        logMessage("Cleared DEFRA emissions.")
        await defraGasRepository.delete({})
        logMessage("Cleared DEFRA gases.")
        await epaGasRepository.delete({})
        logMessage("Cleared EPA gases.")
        await ghgGasRepository.delete({})
        logMessage("Cleared GHG gases.")
        await activityRepository.delete({})
        logMessage("Cleared activities.")
        await equipmentRepository.delete({})
        logMessage("Cleared equipment.")
        await ghgEquipmentRepository.delete({})
        logMessage("Cleared GHG equipment.")

        // Load and insert equipment data
        logMessage("Loading equipment data...")
        const equipmentData = await loadJSON("../fixtures/equipement.json")
        const equipmentEntities = equipmentData.map((data) => {
            const equipment = new EquipmentType()
            equipment.name = data.name
            equipment.description = data.description
            equipment.unit = data.unit
            equipment.minCapacity = data.minCapacity
            equipment.maxCapacity = data.maxCapacity
            equipment.installationEmissionFactor = data.installationEmissionFactor
            equipment.operatingEmissions = data.operatingEmissions
            equipment.refrigerantRemainingAtDisposal = data.refrigerantRemainingAtDisposal
            equipment.recoveryEfficiency = data.recoveryEfficiency
            return equipment
        })

        logMessage("Inserting equipment data...")
        await equipmentRepository.save(equipmentEntities)
        logMessage("Equipment data inserted.")

        // Load and insert ghg equipment data
        logMessage("Loading equipment data...")
        const ghgEquipmentData = await loadJSON("../fixtures/ghg-equipment.json")
        const ghgEquipmentEntities = ghgEquipmentData.map((data) => {
            const equipment = new GhgEquipmentType()
            equipment.name = data.name
            equipment.description = data.description
            equipment.unit = data.unit
            equipment.minCharge = data.minCharge
            equipment.maxCharge = data.maxCharge
            equipment.minAnnualLeakageRate = data.minAnnualLeakageRate
            equipment.maxAnnualLeakageRate = data.maxAnnualLeakageRate
            equipment.minAssemblyRate = data.minAssemblyRate
            equipment.maxAssemblyRate = data.maxAssemblyRate
            equipment.minRecycylingEfficiency = data.minRecycylingEfficiency
            equipment.maxRecycylingEfficiency = data.maxRecycylingEfficiency
            return equipment
        })

        logMessage("Inserting GHG equipment data...")
        await ghgEquipmentRepository.save(ghgEquipmentEntities)
        logMessage("GHG Equipment data inserted.")

        // Insert Activity Data
        logMessage("Loading activity data...")
        const activityData = await loadJSON("../fixtures/activity.json")

        logMessage("Inserting activity data...")
        await activityRepository.save(activityData)
        logMessage("Activity data inserted.")

        const years = [2023, 2024]

        // Load and insert EPA and DEFRA Gas and Emission Data
        for (const year of years) {
            try {
                logMessage(`Loading EPA gas data for year ${year}...`)
                const epaGasData = await loadJSON(`../fixtures/epa${year}.json`)

                for (const gas of epaGasData) {
                    try {
                        logMessage(`Inserting EPA gas: ${gas.name}...`)
                        const epaGasEntity = new EpaGas()
                        epaGasEntity.name = gas.name
                        epaGasEntity.chemicalFormula = gas.chemicalFormula
                        await epaGasRepository.save(epaGasEntity)
                        logMessage(`EPA gas ${gas.name} inserted.`)
                    } catch (error) {
                        if (error.code === "23505") {
                            // Unique violation error code (PostgreSQL)
                            logMessage(`Skipping duplicate EPA gas: ${gas.name}`)
                        } else {
                            logMessage(`Error inserting EPA gas: ${error.message}`)
                        }
                    }
                }

                // Create emissions for EPA Gas
                logMessage(`Creating emissions for EPA gases for year ${year}...`)
                const epaGases = await epaGasRepository.find({ relations: { emissions: true } })
                for (const gas of epaGases) {
                    try {
                        const emissionValue = epaGasData.find(
                            (g) => g.chemicalFormula === gas.chemicalFormula,
                        )?.value
                        if (emissionValue) {
                            const emission = new EpaEmission()
                            emission.gas = gas
                            emission.gwp = emissionValue
                            emission.unit = "kg"
                            emission.year = year
                            await epaEmissionRepository.save(emission)
                            if (gas.emissions?.length) {
                                gas.emissions.push(emission)
                            } else {
                                gas.emissions = [emission]
                            }
                            await epaGasRepository.save(gas) // Save gas with its emissions
                            logMessage(
                                `EPA emission for year ${year} for gas ${gas.id} value ${emissionValue} inserted.`,
                            )
                        }
                    } catch (error) {
                        logMessage(`Error inserting EPA emission: ${error.message}`)
                    }
                }

                // insert ghg gas
                logMessage(`Loading GHG gas data for year ${year}...`)
                const ghgGasData = await loadJSON(`../fixtures/ghg${year}.json`)

                for (const gas of ghgGasData) {
                    try {
                        logMessage(`Inserting GHG gas: ${gas.name}...`)
                        const ghgGasEntity = new GhgGas()
                        ghgGasEntity.name = gas.name
                        ghgGasEntity.chemicalFormula = gas.chemicalFormula
                        await ghgGasRepository.save(ghgGasEntity)
                        logMessage(`GHG gas ${gas.name} inserted.`)
                    } catch (error) {
                        if (error.code === "23505") {
                            // Unique violation error code (PostgreSQL)
                            logMessage(`Skipping duplicate GHG gas: ${gas.name}`)
                        } else {
                            logMessage(`Error inserting GHG gas: ${error.message}`)
                        }
                    }
                }

                // Create emissions for EPA Gas
                logMessage(`Creating emissions for ghg gases...`)
                const ghgGases = await ghgGasRepository.find({ relations: { emissions: true } })
                for (const gas of ghgGases) {
                    try {
                        const emissionValue = ghgGasData.find(
                            (g) => g.chemicalFormula === gas.chemicalFormula,
                        )?.value
                        if (emissionValue) {
                            const emission = new GhgEmission()
                            emission.gas = gas
                            emission.gwp = emissionValue
                            emission.unit = "kg"
                            await ghgEmissionRepository.save(emission)
                            if (gas.emissions?.length) {
                                gas.emissions.push(emission)
                            } else {
                                gas.emissions = [emission]
                            }
                            await ghgGasRepository.save(gas) // Save gas with its emissions
                            logMessage(
                                `GHG emission for year ${year} for gas ${gas.id} value ${emissionValue} inserted.`,
                            )
                        }
                    } catch (error) {
                        logMessage(`Error inserting GHG emission: ${error.message}`)
                    }
                }

                // Load and insert DEFRA Gas Data
                logMessage(`Loading DEFRA gas data for year 2023...`)
                const defraGasData = await loadJSON(`../fixtures/defra2023.json`)
                for (const gas of defraGasData) {
                    try {
                        logMessage(`Inserting DEFRA gas: ${gas.name}...`)
                        const defraGasEntity = new DefraGas()
                        defraGasEntity.name = gas.name
                        defraGasEntity.chemicalFormula = gas.name
                        defraGasEntity.activityId = (
                            await activityRepository.findOneBy({ name: gas.Activity })
                        )?.id
                        defraGasEntity.activity = await activityRepository.findOneBy({
                            name: gas.Activity,
                        })
                        await defraGasRepository.save(defraGasEntity)
                        logMessage(`DEFRA gas ${gas.name} inserted.`)
                    } catch (error) {
                        if (error.code === "23505") {
                            // Unique violation error code (PostgreSQL)
                            logMessage(`Skipping duplicate DEFRA gas: ${gas.name}`)
                        } else {
                            logMessage(`Error inserting DEFRA gas: ${error.message}`)
                        }
                    }
                }

                // Create emissions for DEFRA Gas
                logMessage(`Creating emissions for DEFRA gases for year ${year}...`)
                const defraGases = await defraGasRepository.find()
                for (const gas of defraGases) {
                    try {
                        const emissionData = defraGasData.find((g) => {
                            return g.name === gas.chemicalFormula
                        })
                        if (emissionData) {
                            const emission = new DefraEmission()
                            emission.gas = gas
                            emission.kyoto_gwp = emissionData.kyoto_value
                            emission.non_kyoto_gwp = emissionData.non_kyoto_value
                            emission.year = year
                            emission.unit = "kg"
                            await defraEmissionRepository.save(emission)
                            gas.emissions = [emission]
                            await defraGasRepository.save(gas) // Save gas with its emissions
                            logMessage(
                                `DEFRA emission for gas ${gas.name} value ${JSON.stringify(emissionData)} inserted.`,
                            )
                        }
                    } catch (error) {
                        logMessage(`Error inserting DEFRA emission: ${error.message}`)
                    }
                }
            } catch (error) {
                logMessage(`Error processing year ${year}: ${error.message}`)
            }
        }

        logMessage("Data inserted successfully.")
        console.log("Data inserted successfully")
    } catch (error) {
        logMessage(`Error inserting data: ${error.message}`)
        console.error("Error inserting data:", error)
    } finally {
        // Close the connection after the operations
        logMessage("Closing database connection...")
        await AppDataSource.destroy()
        logMessage("Database connection closed.")
    }
}

// Run the script
;(async () => {
    await insertData()
})()
