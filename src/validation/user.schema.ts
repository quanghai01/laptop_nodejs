import { z } from "zod";

export const userSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters long"),
    password: z.string().trim().min(6, "Password must be at least 6 characters long"),
    fullname: z.string().trim().min(3, "Fullname must be at least 3 characters long"),
    address: z.string().trim().min(3, "Address must be at least 3 characters long"),
    phone: z.string().trim().min(10, "Phone must be at least 10 characters long"),
    accountType: z.string().trim().min(3, "Account type must be at least 3 characters long"),
    avatar: z.string().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;