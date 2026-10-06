import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import type { jwtPayload } from "../types";

export function auth(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;

    if (!token) {
        return errorResponse(res, 401, "Access denied: No token provided!");
    }

    try {
        const verifiedUser = jwt.verify(token as string, process.env.SECRET_KEY!) as jwtPayload;
        // @ts-ignore
        req.email = verifiedUser.email;
        // @ts-ignore
        req.id = verifiedUser.id;
        next();
    } catch (error) {
        return errorResponse(res, 403, "Invalid or expired token!");
    }
}