import z from "zod";

export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20)
});


export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(20)
});