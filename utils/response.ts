import type { Response } from "express";

export function errorResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
        message
    });
}

export function sucessresponse(res: Response, data: string) {
    return res.status(200).json({
        data
    });
}