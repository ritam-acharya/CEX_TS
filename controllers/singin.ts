import type { Request, Response } from "express";
import type { User } from "../types";
import { signinSchema } from "../schema/zodSchema";
import { errorResponse, sucessresponse } from "../utils/response";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/config";


export async function signin(req: Request, res: Response, users: User[]) {
    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
        return errorResponse(res, 400, parsedData.error.issues[0]?.message!);
    }

    const {email, password} = parsedData.data;
    let existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
        return errorResponse(res, 404, "User not found");
    }

    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) {
        return errorResponse(res, 401, "Invalid password!");
    }

    const token = generateToken(existingUser);
    return sucessresponse(res, token);
}