import express from "express";
import { urouter } from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import cors from "cors";
const app = express();
import path from "path";
dotenv.config();
import { fileURLToPath } from "url";
const port = process.env.port || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDb();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", urouter);
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
// app.use("/api/v1/category", crouter);
// app.use("/api/v1/user", prouter);

app.listen(port, () => {
  console.log(`your app is running on the port ${port}`);
});
