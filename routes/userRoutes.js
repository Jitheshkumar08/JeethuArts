// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/logout', logoutUser);


router.get('/current', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    res.json(req.session.user);
});

module.exports = router;
