import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import homeRoute from "@/router/home";
import walletRoute from "@/router/walletRouter";
import {
  globalErrorHandler,
  notFoundHandler,
} from "@/middlewares/error.middleware";
import { Path } from "@/constants/appConstants";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
//Routes
app.use("/", homeRoute);
app.use(`/${Path.wallet}`, walletRoute);

app.use(notFoundHandler);
// Error handling middleware (luôn đặt cuối cùng)
app.use(globalErrorHandler);
//==============================
export default app;
