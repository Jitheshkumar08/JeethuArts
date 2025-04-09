const { sql, poolPromise } = require('../dbconfig');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const {
            Username,
            Password,
            Email,
            FirstName,
            LastName,
            Gender,
            Address,
            PhoneNumber,
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
    } catch (err) {
        console.error('❌ Register Error:', err);
        res.status(500).json({ error: err.message || 'Registration failed' });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const { Username, Password } = req.body;

        const result = await pool.request()
            .input('Username', sql.VarChar, Username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('❌ Login Error:', err);
        res.status(500).json({ error: err.message || 'Login failed' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
