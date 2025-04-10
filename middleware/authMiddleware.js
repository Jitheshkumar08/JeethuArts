// Ensure the user is logged in
function ensureLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();  // Proceed to the next middleware or route handler
    } else {
        // Redirect to login if not logged in
        return res.redirect('/login');
    }
}

// Ensure the user is an admin
function ensureAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.Role === 'admin') {
        return next();  // Admin can proceed
    } else {
        // Redirect to home if not admin
        return res.redirect('/home');
    }
}

// Export the middleware functions
module.exports = { ensureLoggedIn, ensureAdmin };

    



