import { handleRegister } from "@/services/client/auth.service";
import { registerSchema } from "@/validation/register.schema";
import { Request, Response } from "express";
const getLoginPage = async (req: Request, res: Response) => {
    return res.render("client/auth/login");
}

const getRegisterPage = async (req: Request, res: Response) => {
    return res.render("client/auth/register", { oldData: null });
}

const createAccount = async (req: Request, res: Response) => {
    try {
        const result = await registerSchema.safeParseAsync(req.body);
        if (!result.success) {
            const oldData = { ...req.body, errors: result.error.issues };
            return res.render("client/auth/register", { oldData });
        }
        const { username, password, fullname } = result.data;
        const user = await handleRegister(username, password, fullname);
        console.log("🚀 ~ createAccount ~ user:", user)
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.redirect("/register");
    }
}
export {
    getLoginPage,
    getRegisterPage,
    createAccount
}