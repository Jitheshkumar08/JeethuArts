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

// Route to handle artwork upload






const adminController = require('../controllers/adminController');




// 🔥 Correct upload route for the form
router.post('/admin/upload-art', ensureAdmin, upload.single('artImage'), uploadArtwork);

module.exports = router;


