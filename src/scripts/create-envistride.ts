import { AppDataSource } from "../data-source"
import fs from "fs"
import path from "path"
import { User } from "../entity/user/User.entity"
import { Role } from "../enum/role.enum"

// Utility function to log messages
function logMessage(message: string) {
    const logFilePath = path.resolve(__dirname, "../log/log.txt")
    const logMessage = `${new Date().toISOString()} - ${message}\n`
    fs.appendFileSync(logFilePath, logMessage, "utf-8")
}

// Main function to insert data
async function createSuperAdmin() {
    try {
        logMessage("Initializing database connection...")
        await AppDataSource.initialize()
        logMessage("Database connection established.")
        const userRepository = AppDataSource.getRepository(User)
        const superadmin = new User()
        Object.assign(superadmin, {
            first_name: "Super",
            last_name: "Admin",
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            phone_country_code: "+91",
            phone_number: "9876543210",
            role: Role.ENVISTRIDE,
        })
        await userRepository.save(superadmin)
        logMessage("Super admin created successfully.")
        console.log("Super admin created successfully")
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
    await createSuperAdmin()
})()
