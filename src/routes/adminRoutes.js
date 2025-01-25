import express from "express";
import { authenticateJWT } from "../../config/auth.js"; 
import {
  loginAdmin,
  addNewsOnly,
  uploadImageOnly,
  addNewsWithImage
} from "../controllers/adminController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginAdmin);

router.post("/news", authenticateJWT, addNewsOnly);
router.post("/images", authenticateJWT, upload.single("image"), uploadImageOnly);
router.post("/add-news-with-image", authenticateJWT, upload.single("image"), addNewsWithImage);

export default router;
