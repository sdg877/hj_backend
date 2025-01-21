import express from 'express';
import { loginAdmin, addNewsUpdate } from '../controllers/adminController.js'

const router = express.Router();

router.post('/login', loginAdmin);
router.post("/news", addNewsUpdate);

export default router;
