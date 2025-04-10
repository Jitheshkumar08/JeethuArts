// File: /middleware/authMiddleware.js

// Ensure the user is logged in
function ensureLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        // console.log(`✅ Logged in as: ${req.session.user.Username}`);
        return next();
    } else {
        // console.log("⚠️ Not logged in - redirecting to login");
        return res.redirect('/login');
    }
}

// Ensure the user is an admin
function ensureAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.Role === 'admin') {
        // console.log(`🔐 Admin access granted to: ${req.session.user.Username}`);
        return next();
    } else {
        // console.log("🚫 Admin access denied - redirecting to home");
        return res.redirect('/home');
    }
}


module.exports = function ensureLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).send('Unauthorized');
};


