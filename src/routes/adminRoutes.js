import express from 'express';
import { loginAdmin, addNewsOnly, uploadImageOnly, addNewsWithImage } from '../controllers/adminController.js'
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', loginAdmin);
router.post("/news", addNewsOnly);
router.post("/images", upload.single('image'), uploadImageOnly);
router.post("/add-news-with-image", addNewsWithImage)

export default router;
