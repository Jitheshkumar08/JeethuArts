// middleware/authMiddleware.js
function ensureLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = ensureLoggedIn;
