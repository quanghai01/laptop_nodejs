import { getProductById } from "@/services/client/productclient.service";
import { Request, Response } from "express";

const getProductDetailPage = async (req: Request, res: Response) => {
    const product = await getProductById(+req.params.id);
    if (!product) {
        return res.redirect("/");
    }
    console.log("🚀 ~ getProductDetailPage ~ product:", product)
    return res.render("client/product/detail", {
        product
    });
}

export {
    getProductDetailPage
}
