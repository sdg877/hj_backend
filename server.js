import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import siteRoutes from "./src/routes/siteRoutes.js"

dotenv.config();
console.log("AWS_S3_BUCKET_NAME:", process.env.AWS_S3_BUCKET_NAME);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
