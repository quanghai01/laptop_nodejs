import { ACCOUNT_TYPE } from "@/config/constant";
import getConnection from "@/config/db";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
}

const handleCreateUser = async (username: string, fullname: string, address: string, phone: string, avatar: string, accountType: string, role: String) => {
    //insert into database
    //return result
    try {
        const hashedPassword = await hashPassword("123456");
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                fullname,
                address,
                phone,
                accountType,
                avatar,
                roleId: role == 'admin' ? 1 : 2,
            },
        });
        return user;
    } catch (err) {
        console.error("Error creating user:", err);
        return null;
    }
}

const handleDeleteUser = async (id: number) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id,
            },
        });
        return user;
    } catch (err) {
        console.error("Error deleting user:", err);
        return null;
    }
}
const handleUpdateUser = async (id: number, username: string, password: string, fullname: string, address: string, phone: string, accountType: string, avatar: string) => {
    try {
        let updateData: any = {
            username,
            fullname,
            address,
            phone,
            accountType,
            avatar,
        };

        // Only update and hash password if it was provided (not empty)
        if (password) {
            updateData.password = await hashPassword(password);
        }

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: updateData,
        });
        return user;
    } catch (err) {
        console.error("Error updating user:", err);
        return null;
    }
}

const getAllUser = async () => {
    //get all user from database
    try {
        const user = await prisma.user.findMany();
        return user;
    } catch (err) {
        console.error("Error getting all users:", err);
        return [];
    }
}
const getAllRole = async () => {
    try {
        const role = await prisma.role.findMany();
        return role;
    } catch (err) {
        console.error("Error getting all roles:", err);
        return [];
    }
}
const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    } catch (err) {
        console.error("Error getting user by id:", err);
        return null;
    }
}
export {
    handleCreateUser,
    getAllUser,
    handleDeleteUser,
    handleUpdateUser,
    getUserById,
    getAllRole,
    hashPassword
}