declare namespace Express {
    export interface Request {
        user?: {
            id: string
            role: string
            email: string
            organization: {
                id: string
            }
            subsidiary: {
                id: string
            }
            facility: {
                id: string
            }
        }
    }
}
