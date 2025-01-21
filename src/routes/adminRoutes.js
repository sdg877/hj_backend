import express from 'express';
import { loginAdmin } from '../controllers/adminController.js'
import { addNewsUpdate } from "../controllers/adminController";

const router = express.Router();

router.post('/login', loginAdmin);
router.post("/news", addNewsUpdate);

export default router;
