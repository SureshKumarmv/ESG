import { Worker } from "bullmq"
import { EMAIL_QUEUE, REDIS_CONNECTION } from "./constants"
import { sendEmail } from "./helpers"

export const worker = new Worker(
    EMAIL_QUEUE,
    async (job) => {
        await sendEmail({
            ...job.data,
        })
    },
    {
        connection: REDIS_CONNECTION,
    },
)

worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`)
})

worker.on("failed", (job, err) => {
    console.log("Failed job", job)
    console.log(`${job.id} has failed with ${err.message}`)
})
