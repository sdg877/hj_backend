import express from 'express';
import { loginAdmin, addNewsUpdate, uploadImageToS3 } from '../controllers/adminController.js'

const router = express.Router();

router.post('/login', loginAdmin);
router.post("/news", addNewsUpdate);
router.post("/images", uploadImageToS3)

export default router;
