import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

const getDashboardPage = async (req: Request, res: Response) => {
    try {
        const [totalUsers, totalRoles] = await Promise.all([
            prisma.user.count(),
            prisma.role.count(),
        ]);

        return res.render("admin/dashboard/show", {
            stats: {
                users: totalUsers,
                roles: totalRoles,
                products: 0, // Placeholder as model is not yet defined
                orders: 0    // Placeholder as model is not yet defined
            }
        });
    } catch (error) {
        console.error("Dashboard controller error:", error);
        return res.status(500).render("admin/dashboard/show", {
            stats: { users: 0, products: 0, orders: 0, roles: 0 },
            error: "Failed to fetch dashboard data"
        });
    }
}

export {
    getDashboardPage
}
