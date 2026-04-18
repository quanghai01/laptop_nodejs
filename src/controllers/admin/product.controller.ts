import { getAllCategory, getAllProduct, handleCreateProduct } from "@/services/admin/product.service";
import { ProductSchema, productSchema } from "@/validation/product.schema";
import { Request, Response } from "express";
import { validate } from "uuid";



const getProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    const categories = await getAllCategory();
    console.log("🚀 ~ getProductPage ~ categories:", categories)
    return res.render("admin/product/show", {
        title: "Product",
        products,
        categories
    });
}

const getCreateProductPage = async (req: Request, res: Response) => {
    const categories = await getAllCategory();
    console.log("🚀 ~ getCreateProductPage ~ categories:", categories)
    return res.render("admin/product/create", {
        categories
    });
}

const postCreateProduct = async (req: Request, res: Response) => {
    try {
        const data = {
            ...req.body,
            image: req.file ? req.file.filename : ""
        };
        const result = productSchema.safeParse(data);
        console.log("🚀 ~ postCreateProduct ~ result:", result)

        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message);
            console.log("Validation errors:", errors);
            const categories = await getAllCategory();
            return res.render("admin/product/create", {
                categories,
                errors
            });
        }
        const image = req.file ? req.file.filename : "";
        const { name, price, description, quantity, sold, categoryId } = result.data;

        const newProduct = await handleCreateProduct(
            name, price, description, quantity, sold, image, categoryId
        );

        if (newProduct) {
            return res.redirect("/admin/product");
        } else {
            return res.redirect("/admin/product/create");
        }

    } catch (error) {
        console.error("Controller Error:", error);
        return res.redirect("/admin/product/create");
    }
}

const getEditProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/edit", {
        title: "Edit Product",
    });
}

const postUpdateProduct = async (req: Request, res: Response) => {
    return res.render("admin/product/edit", {
        title: "Edit Product",
    });
}

const postDeleteProduct = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}


export {
    getProductPage,
    getCreateProductPage,
    postCreateProduct,
    getEditProductPage,
    postUpdateProduct,
    postDeleteProduct
}