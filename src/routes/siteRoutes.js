import express from "express";
import { getImagesByCategory } from "../controllers/siteController.js";
import { getNews } from "../controllers/siteController.js";

const router = express.Router();

router.get('/gallery/:category', getImagesByCategory);
router.get('/news', getNews);

export default router;
