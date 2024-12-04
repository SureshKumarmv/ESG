import { AppDataSource } from "../data-source"
import { EquipmentType } from "../entity/equipment-type/EquipmentType.entity"
import { GhgEquipmentType } from "../entity/equipment-type/GhgEquipment.entity"
import fs from "fs"
import path from "path"

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

// Utility function to load JSON data
async function loadJSON(filePath: string) {
    const absolutePath = path.resolve(__dirname, filePath)
    const fileContent = fs.readFileSync(absolutePath, "utf-8")
    return JSON.parse(fileContent)
}

// Main function to insert data
async function updateData() {
    try {
        // clear existing logs
        clearLogMessage()

        logMessage("Initializing database connection...")
        await AppDataSource.initialize()
        logMessage("Database connection established.")

        // Repositories
        const equipmentRepository = AppDataSource.getRepository(EquipmentType)
        const ghgEquipmentRepository = AppDataSource.getRepository(GhgEquipmentType)
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
    await updateData()
})()
