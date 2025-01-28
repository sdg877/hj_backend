import express from "express";
import { authenticateJWT } from "../../config/auth.js"; 
import {
  loginAdmin,
  addNews,
  uploadImage,
  deleteImage, 
  updateNews,
  deleteNews
} from "../controllers/adminController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginAdmin);
router.post("/news", authenticateJWT, addNews);
router.put("/updatenews/:newsId", authenticateJWT, updateNews);
router.delete("/deletenews/:newsId", authenticateJWT, deleteNews);
router.post("/images", authenticateJWT, upload.single("image"), uploadImage);
router.delete("/deleteimage", authenticateJWT, deleteImage);

export default router;
