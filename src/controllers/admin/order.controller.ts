import { Request, Response } from "express";

const getOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show");
}

export {
    getOrderPage
}