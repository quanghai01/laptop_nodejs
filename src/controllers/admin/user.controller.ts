import { Request, Response } from "express";
import { handleCreateUser, getAllUser, handleDeleteUser, handleUpdateUser, getUserById, getAllRole } from "@/services/admin/user.service";
import { ACCOUNT_TYPE } from "@/config/constant";

const getUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();
    const roles = await getAllRole();
    return res.render("admin/user/show", { users, roles, ACCOUNT_TYPE });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRole();
    return res.render("admin/user/create", { roles, ACCOUNT_TYPE });
}

const getEditUserPage = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const user = await getUserById(id);
    const roles = await getAllRole();
    return res.render("admin/user/edit", { user, roles, ACCOUNT_TYPE });
}
const postCreateUser = async (req: Request, res: Response) => {
    const { username, fullname, address, phone, accountType, role } = req.body;
    const avatar = req.file ? req.file.filename : "";
    const user = await handleCreateUser(username, fullname, address, phone, avatar, accountType, role);
    console.log(user);
    return res.redirect("/admin/user");
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, username, password, fullname, address, phone, accountType, avatar } = req.body;
    await handleUpdateUser(+id, username, password, fullname, address, phone, accountType, avatar);
    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    await handleDeleteUser(id);
    return res.redirect("/admin/user");
}

export {
    getUserPage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    postUpdateUser,
    getEditUserPage
}