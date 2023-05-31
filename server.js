import express from "express";
import { urouter } from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import cors from 'cors'
const app = express();
dotenv.config();
const port = process.env.port || 8080;

connectDb();
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", urouter);
// app.use("/api/v1/category", crouter);
// app.use("/api/v1/user", prouter);

app.listen(port, () => {
  console.log(`your app is running on the port ${port}`);
});
