import express from 'express';
import { loginAdmin, addNewsOnly, uploadImageOnly, addNewsWithImage } from '../controllers/adminController.js'

const router = express.Router();

router.post('/login', loginAdmin);
router.post("/news", addNewsOnly);
router.post("/images", uploadImageOnly);
router.post("/add-news-with-image", addNewsWithImage)


export default router;
