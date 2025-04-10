const sql = require('mssql');
const { poolPromise } = require('../dbconfig');  // Import poolPromise correctly

// Upload Artwork Controller
exports.uploadArtwork = async (req, res) => {
    try {
        const { title, description, price, artType, tags, dimension } = req.body;
        const uploadedBy = req.session.user?.UserID;

        if (!uploadedBy) {
            return res.status(401).json({ error: 'Unauthorized. Please login as admin.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image upload failed. No file found.' });
        }

        const imagePath = '/uploads/' + req.file.filename;

        if (!title || !description || !price || !imagePath) {
            return res.status(400).json({ error: 'Missing required fields or image upload failed.' });
        }

        // Ensure the pool is available by awaiting the resolved pool object
        const pool = await poolPromise;  // Get the resolved pool object
        if (!pool) {
            throw new Error("Database pool is not available");
        }

        // Insert the artwork into the database
        await pool.request()  // Now `request()` should work properly
            .input('Title', sql.VarChar(100), title)
            .input('Description', sql.Text, description)
            .input('Price', sql.Decimal(10, 2), price)
            .input('ImagePath', sql.VarChar(255), imagePath)
            .input('UploadedBy', sql.Int, uploadedBy)
            .input('ArtType', sql.VarChar(50), artType || null)
            .input('Tags', sql.VarChar(255), tags || null)
            .input('Dimensions', sql.VarChar(50), dimension || null)
            .query(`
                INSERT INTO Artworks (Title, Description, Price, ImagePath, UploadedBy, ArtType, Tags, Dimensions)
                VALUES (@Title, @Description, @Price, @ImagePath, @UploadedBy, @ArtType, @Tags, @Dimensions)
            `);

        res.status(200).json({ message: 'Artwork uploaded successfully' });
    } catch (error) {
        console.error('Upload Artwork Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get All Artworks with Username via JOIN
exports.getAllArtworks = async (req, res) => {
    try {
        const pool = await poolPromise;  // Ensure the pool is connected properly
        if (!pool) {
            throw new Error("Database pool is not available");
        }

        const result = await pool.request()
            .query(`
                SELECT a.*, u.Username AS UploadedByUsername
                FROM Artworks a
                INNER JOIN Users u ON a.UploadedBy = u.UserID
                ORDER BY a.ArtworkID DESC
            `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Fetch Artworks Error:', error);
        res.status(500).json({ error: 'Failed to fetch artworks' });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Artwork by ID
exports.deleteArtwork = async (req, res) => {
    try {
        const artworkId = req.params.id;

        if (!artworkId) {
            return res.status(400).json({ error: 'Artwork ID is required' });
        }

        const pool = await poolPromise;  // Ensure the pool is connected properly
        if (!pool) {
            throw new Error("Database pool is not available");
        }

        const result = await pool.request()
            .input('ArtworkID', sql.Int, artworkId)
            .query('DELETE FROM Artworks WHERE ArtworkID = @ArtworkID');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        res.status(200).json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        console.error('Delete Artwork Error:', error);
        res.status(500).json({ error: 'Failed to delete artwork' });
    }
};
