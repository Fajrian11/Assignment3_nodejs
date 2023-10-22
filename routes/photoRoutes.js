const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, photoController.createPhoto);
router.get('/all', authMiddleware, photoController.getAllPhotos);
router.get('/:id', authMiddleware, photoController.getPhotoById);

module.exports = router;
