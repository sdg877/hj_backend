import express from "express";
import { getImagesByCategory } from "../controllers/siteController.js";

const router = express.Router();

router.get('/gallery/:category', getImagesByCategory);

export default router;
