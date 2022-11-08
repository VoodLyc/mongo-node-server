import { object, string, boolean } from 'zod';

export const createUserSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    email: string({
        required_error: "Email is required",
    }),
    username: string({
        required_error: "Username is required"
    }).min(8, "Password too short").max(16, "Password too long"),
    password: string({
        required_error: "Password is required",
    }),
    active: boolean({
    })
})