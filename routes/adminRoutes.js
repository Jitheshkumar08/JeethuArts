// routes/adminRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const ensureAdmin = require('../middleware/ensureAdmin');

router.get('/admin', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin.html'));
});

const upload = require('../uploadMiddleware');
const { uploadArtwork } = require('../controllers/adminController');



const adminController = require('../controllers/adminController');



router.post('/admin/upload-art', ensureAdmin, upload.single('artImage'), uploadArtwork);
router.post('/upload-art', adminController.uploadArtwork);

module.exports = router;


