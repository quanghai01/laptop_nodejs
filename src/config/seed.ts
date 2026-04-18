import { prisma } from "@/lib/prisma";
import { ACCOUNT_TYPE } from "./constant";
import bcrypt from "bcryptjs";

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
}
const initData = async () => {
    try {
        const [userCount, roleCount, categoryCount, productCount] = await Promise.all([
            prisma.user.count(),
            prisma.role.count(),
            prisma.category.count(),
            prisma.product.count()
        ]);

        if (userCount > 0 || roleCount > 0 || categoryCount > 0 || productCount > 0) {
            // Disable foreign key checks to allow deletion/truncation
            await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
            
            // Delete in order: children first, then parents
            // Using DELETE instead of TRUNCATE can be safer for FK-referenced tables in some MySQL versions
            await prisma.$executeRawUnsafe(`DELETE FROM products;`);
            await prisma.$executeRawUnsafe(`DELETE FROM users;`);
            await prisma.$executeRawUnsafe(`DELETE FROM roles;`);
            await prisma.$executeRawUnsafe(`DELETE FROM categories;`);

            // Reset AUTO_INCREMENT
            await prisma.$executeRawUnsafe(`ALTER TABLE products AUTO_INCREMENT = 1;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = 1;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE roles AUTO_INCREMENT = 1;`);
            await prisma.$executeRawUnsafe(`ALTER TABLE categories AUTO_INCREMENT = 1;`);
            
            // Re-enable foreign key checks
            await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
            
            console.log(">>> Database cleared: IDs reset to 1.");
        }

        console.log(">>> Seeding initial data...");

        const adminRole = await prisma.role.create({
            data: {
                name: "admin",
                description: "Administrator with full access",
            }
        });

        const userRole = await prisma.role.create({
            data: {
                name: "user",
                description: "Regular system user",
            }
        });

        console.log(">>> Seeding categories...");
        await prisma.category.createMany({
            data: [
                { name: "macbook", description: "All kinds of laptops" },
                { name: "asus", description: "Wired and wireless mice" },
                { name: "dell", description: "Mechanical and membrane keyboards" },
                { name: "acer", description: "Gaming and office monitors" },
            ]
        });

        const hashedPassword = await hashPassword("123456");

        await prisma.user.create({
            data: {
                username: "admin",
                password: hashedPassword,
                fullname: "Administrator",
                address: "System HQ",
                phone: "0365767676",
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar: "",
                roleId: adminRole.id,
            }
        });

        console.log(">>> Initial data seeded successfully!");
    } catch (error) {
        console.error(">>> Error during data seeding:", error);
    }
}

export default initData;
