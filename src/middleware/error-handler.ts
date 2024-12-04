import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { AnyObject } from "../types/common"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: AnyObject, req: Request, res: Response, _: NextFunction) => {
    console.log("error from middleware", error)
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
        })
    }
    return res.status(400).json({
        message: error.message ? error.message : "Something went wrong",
        details:
            error?.detail?.replace(/[()[\]{}]/g, "") ?? error.message ?? "Something went wrong",
    })
}
