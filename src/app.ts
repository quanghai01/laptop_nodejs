import express from "express";
import path from "path";
import webRoutes from "@/routes/web";
import getConnection from "@/config/db";
import initData from "./config/seed";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, "public")));

//web routes
webRoutes(app);

//database connect mysql and seed data
(async () => {
  try {
    await getConnection();
    // await initData();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(">>> Startup Error:", error);
  }
})();
