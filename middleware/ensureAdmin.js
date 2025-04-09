// middleware/ensureAdmin.js
function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.Role === 'admin') {
        return next();
    } else {
        res.status(403).send('Access denied');
    }
}

module.exports = ensureAdmin;
