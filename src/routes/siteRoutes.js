const express = require('express');
const { getImagesByCategory } = require('../controllers/imageController');

const router = express.Router();

router.get('/images/:category', getImagesByCategory);

module.exports = router;
