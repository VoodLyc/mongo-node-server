import { object, string, boolean, number } from 'zod';

export const createProductSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    description: string({
        required_error: "Description is required",
    }),
    quantity: number({
        required_error: "Username is required"
    }).min(0, "Negative values are not allowed"),
    brand: string({
        required_error: "Password is required",
    }),
    owner: string({
        required_error: "Owner is required"
    })
})