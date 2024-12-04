import { Request, Response } from "express"
import { bookDemoSchema } from "../../validations/demo"
import { Demo } from "../../entity/book-demo/Demo.entity"
import { AnyObject } from "../../types/common"

export class BookADemoController {
    static async getResults(req: Request, res: Response) {
        const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
        const offset = (page - 1) * parseInt(limit)
        const DemoBuilder = Demo.createQueryBuilder("demo")
        const count = await DemoBuilder.getCount()
        if (pagination) {
            delete req.query["pagination"]
            delete req.query["limit"]
            delete req.query["page"]
            const results = await DemoBuilder.where({ ...req.query })
                .loadAllRelationIds()
                .orderBy("demo.created_at", "DESC")
                .skip(offset)
                .take(limit)
                .getMany()
            res.status(200).json({
                data: results,
                page,
                total_count: count,
                limit,
            })
        } else {
            const results = await DemoBuilder.where({ ...req.query }).getMany()
            res.status(200).json({
                data: results,
            })
        }
    }
    static async postDemoForm(req: Request, res: Response) {
        const parsedBody = await bookDemoSchema.parseAsync(req.body)
        const demo = Object.assign(new Demo(), parsedBody)
        const savedResult = await Demo.save(demo)
        res.status(201).json({ message: "Details saved successfully", data: savedResult })
    }
}
