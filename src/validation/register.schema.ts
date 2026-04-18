import z from "zod";
import { isEmailExist } from "@/services/client/auth.service";

const emailSchema = z.string().email("Invalid email address").refine(async (email) => {
    const exist = await isEmailExist(email);
    return !exist;
}, "Email already exists");

export const registerSchema = z.object({
    username: emailSchema,
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long").max(20, "Confirm Password must be at most 20 characters long"),
    fullname: z.string().min(3, "Fullname must be at least 3 characters long").max(20, "Fullname must be at most 20 characters long"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})