// controllers/userController.js
const { sql, poolPromise } = require('../dbconfig');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const {
            Username, Password, Email, FirstName, LastName,
            Gender, Address, PhoneNumber
        } = req.body;

        const hashedPassword = await bcrypt.hash(Password, 10);

        await pool.request()
            .input('Username', sql.VarChar, Username)
            .input('Password', sql.VarChar, hashedPassword)
            .input('Email', sql.VarChar, Email)
            .input('FirstName', sql.VarChar, FirstName)
            .input('LastName', sql.VarChar, LastName)
            .input('Gender', sql.VarChar, Gender)
            .input('Address', sql.VarChar, Address)
            .input('PhoneNumber', sql.VarChar, PhoneNumber)
            .query(`INSERT INTO Users 
                    (Username, Password, Email, FirstName, LastName, Gender, Address, PhoneNumber) 
                    VALUES (@Username, @Password, @Email, @FirstName, @LastName, @Gender, @Address, @PhoneNumber)`);

        res.status(200).json({ message: 'User registered successfully!' });
        // res.redirect('/gallery.html?loggedin=true');
    } catch (err) {
        console.error('❌ Register Error:', err);
        res.status(500).json({ error: err.message || 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const { Username, Password } = req.body;

        const result = await pool.request()
            .input('Username', sql.VarChar, Username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        const user = result.recordset[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        req.session.user = {
            UserID: user.UserID,
            Username: user.Username,
            Role: user.Role
        };

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('❌ Login Error:', err);
        res.status(500).json({ error: err.message || 'Login failed' });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Logout Error:", err);
            return res.status(500).send("Logout failed");
        }
        res.clearCookie('connect.sid');
        res.redirect('/login.html?loggedout=true');

    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
