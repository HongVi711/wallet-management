import walletsController from "@/controller/walletController";
import express from "express";

const router = express.Router();
const controller = walletsController();

router.get("/", controller.homeIndex);
router.post("/", controller.createWallet);

export default router;
