import { ACCOUNT_TYPE } from "@/config/constant"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/services/admin/user.service"

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: email
        }
    })
    if (user) {
        return true
    }
    return false
}

const handleRegister = async (username: string, password: string, fullname: string) => {
    const hashedPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {
            name: "USER"
        }
    })
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            fullname,
            address: "",
            phone: "",
            avatar: "",
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: userRole?.id!
        }
    })
    return user
}

export {
    isEmailExist,
    handleRegister
}
