import jwt from "jsonwebtoken"
import type { User } from "../types";

export let userId: number = 1;

export function getId() {
    return userId;
}

export function increaseId() {
    userId++;
}

export function generateToken(userInfo: User) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({
        email: userInfo.email,
        id: userInfo.id
    }, key!);

    return token;
}