import { Queue } from "bullmq"
import { EMAIL_QUEUE, REDIS_CONNECTION } from "./constants"
import { Any } from "../types/common"

export const queue = new Queue(EMAIL_QUEUE, {
    connection: REDIS_CONNECTION,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: true,
    },
})

export async function addJobsTEmailoQueue(job: Any) {
    return await queue.add(`email`, job.data)
}
