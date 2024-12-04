import { NextFunction, Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import { AnyObject } from "../types/common"

// Middleware to automatically transform TypeORM entities
export function transformMiddleware(req: Request, res: Response, next: NextFunction) {
    // Store the original res.json method
    const originalJson = res.json

    // Override res.json
    res.json = function (data: AnyObject) {
        // Check if data is an object, and apply classToPlain if it is
        if (typeof data === "object") {
            data = instanceToPlain(data)
        }

        // Call the original res.json method with transformed data
        return originalJson.call(this, data)
    }

    next()
}
