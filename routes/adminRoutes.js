// routes/adminRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const ensureAdmin = require('../middleware/ensureAdmin');

router.get('/admin', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin.html'));
});

module.exports = router;
