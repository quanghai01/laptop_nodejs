import express, { Express } from "express";
import { getCreateUserPage, getEditUserPage, getUserPage, postCreateUser, postDeleteUser, postUpdateUser, } from "@/controllers/admin/user.controller";
import { getDashboardPage } from "@/controllers/admin/dashboard.controller";
import { getOrderPage } from "@/controllers/admin/order.controller";
import { getCreateProductPage, getEditProductPage, getProductPage, postCreateProduct, postDeleteProduct } from "@/controllers/admin/product.controller";
import upload from "../config/multer";
import { getHomePage } from "@/controllers/client/home.controller";
import { getProductDetailPage } from "@/controllers/client/productdetail.controller";
import { createAccount, getLoginPage, getRegisterPage } from "@/controllers/client/auth.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductDetailPage);
  router.get("/admin/dashboard", getDashboardPage);
  router.get("/admin/order", getOrderPage);
  router.get("/admin/product", getProductPage);
  router.get("/admin/user", getUserPage);

  router.get("/create-user", getCreateUserPage);
  router.post("/create-user", (req, res, next) => { (req as any).uploadFolder = 'user'; next(); }, upload.single('avatar'), postCreateUser);
  router.post("/delete-user/:id", postDeleteUser);
  router.get("/update-user/:id", getEditUserPage);
  router.post("/handle-update-user", postUpdateUser);

  router.get("/admin/product/create", getCreateProductPage);
  router.post("/admin/product/create", (req, res, next) => { (req as any).uploadFolder = 'products'; next(); }, upload.single('image'), postCreateProduct);
  router.post("/admin/product/delete/:id", postDeleteProduct);
  router.get("/admin/product/update/:id", getEditProductPage);


  router.get("/login", getLoginPage);
  router.get("/register", getRegisterPage);
  router.post("/register", createAccount);
  app.use("/", router);
};
export default webRoutes;

