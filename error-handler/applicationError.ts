import { Request , Response , NextFunction } from "express";

// Custom Error Class
export class ApplicationError extends Error{
    statusCode: number;
    details?:object[];  //separate property to hold non-string error details

    constructor(message:string , statusCode: number , details?:object[]){
        super(message);
        this.statusCode = statusCode;
        this.details= details;   
    }
}
// Error Handling Middleware
export const errorHandler = (
    err: ApplicationError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message, 
            details: err.details || null, 
            statusCode: statusCode,
        },
    });
};
