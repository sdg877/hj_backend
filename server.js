
import express from "express"; 
import dotenv from "dotenv";  
import cors from "cors";   
import connectDB from "./config/db.js";  
import authRoutes from "./src/routes/authRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
