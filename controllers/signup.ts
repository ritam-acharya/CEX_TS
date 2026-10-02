import type { Request, Response } from "express"; 
import { signupSchema } from "../schema/zodSchema";
import { errorResponse, sucessresponse } from "../utils/response";
import type { User } from "../types";
import { getId, increaseId } from "../utils/config";
import bcrypt from "bcrypt";


export async function signup(req: Request, res: Response, users: User[]) {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        return errorResponse(res, 400, parsedData.error.message);
    }

    const {email, password} = parsedData.data;

    // check if the user already exist
    let existingUser = users.find((u) => u.email === email);
    console.log(existingUser);

    if (existingUser) {
        return errorResponse(res, 409, "User already exist");
    }

    // hash the password 
    let hashedPassword = await bcrypt.hash(password, 6);

    users.push({
        id: getId(),
        email: email,
        password: hashedPassword
    });

    increaseId();

    sucessresponse(res, "Signup successfull");
}