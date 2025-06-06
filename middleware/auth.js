// middleware/auth.js
function ensureLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { ensureLoggedIn };
