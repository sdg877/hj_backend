import express from "express";
import { authenticateJWT } from "../../config/auth.js"; 
import {
  loginAdmin,
  addNews,
  uploadImage,
  deleteImage, 
  updateNews,
  deleteNews,
  getImage,
  getSingleNews
} from "../controllers/adminController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginAdmin);
router.post("/news", authenticateJWT, addNews);
router.put("/updatenews/:newsId", authenticateJWT, updateNews);
router.delete("/deletenews/:newsId", authenticateJWT, deleteNews);
router.post("/images", authenticateJWT, upload.single("image"), uploadImage);
router.get("/thumbnails", getImage)
router.delete("/delete", deleteImage);
router.get("/getnews/:id", getSingleNews)

export default router;
