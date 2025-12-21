import http from "http";
import dotenv from "dotenv";

import app from "./src/app";
import connectDB from "./src/configs/database";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

connectDB();

const server = http.createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});
