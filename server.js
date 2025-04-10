// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ensureLoggedIn = require('./middleware/authMiddleware');
const ensureAdmin = require('./middleware/ensureAdmin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'mypasswordispassword123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));



// Routes
app.use('/api/users', userRoutes);
app.use('/', adminRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/gallery', ensureLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'gallery.html'));
});

app.get('/admin', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'admin.html'));
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

