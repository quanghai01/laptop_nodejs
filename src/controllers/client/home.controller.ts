import { Request, Response } from "express";
import { getAllProduct, getAllCategory } from "@/services/client/productclient.service";

const getHomePage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    const categories = await getAllCategory();
    return res.render("client/home", {
        products,
        categories
    });
}

export {
    getHomePage
}