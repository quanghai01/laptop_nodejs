import { prisma } from "@/lib/prisma";


const getAllProduct = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            }
        });
        return products;
    } catch (err) {
        console.error("Error getting all products:", err);
        return [];
    }
}

const getAllCategory = async () => {
    try {
        const category = await prisma.category.findMany();
        return category;
    } catch (err) {
        console.error("Error getting all categories:", err);
        return [];
    }
}

const getProductById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
            }
        });
        return product;
    } catch (err) {
        console.error("Error getting product by id:", err);
        return null;
    }
}
export {
    getAllProduct,
    getAllCategory,
    getProductById
}