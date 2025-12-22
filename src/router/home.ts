import homeController from "@/controller/homeController/HomeController";
import express from "express";

const router = express.Router();
const controller = homeController();

router.get("/", controller.homeIndex);

export default router;
