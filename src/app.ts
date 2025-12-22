import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import globalErrorHandler from "@/middlewares/error.middleware";

import homeRoute from "@/router/home";
//Routes
//==============================
//Middlewares
// import errorMiddleware from "./middlewares/error.middleware";
//==============================
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
//Routes
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/roles", roleRoute);
// app.use("/api/v1/users", userRoute);
app.use("/", homeRoute);

// Error handling middleware (luôn đặt cuối cùng)
app.use(globalErrorHandler);
//==============================
export default app;
