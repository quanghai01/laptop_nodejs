import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


const handleCreateProduct = async (name: string, price: number, description: string, quantity: number, sold: number, image: string, categoryId: number) => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                image,
                quantity,
                sold,
                categoryId,
            },
        });
        return product;
    } catch (err) {
        console.error("Error creating product:", err);
        return null;
    }
}

const handleDeleteProduct = async (id: number) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id
            }
        })
        return product
    } catch (error) {
        console.error("errror delete product")
        return null
    }
}

const handleEditProduct = async (id:number,name:string,price:number,description:string,quantity:number,sold:number,image:string,categoryId:number) => {
    try {
        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                price,
                description,
                image,
                quantity,
                sold,
                categoryId,
            },
        });
        return product;
    } catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
}

const getAllProduct = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
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


export {
    handleCreateProduct,
    getAllProduct,
    getAllCategory
}