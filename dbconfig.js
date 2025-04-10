const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // make sure it's DB_PASS
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT) || 1433,
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ MSSQL Connected');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed!', err);
        throw err;
    });


module.exports = {
    sql,
    poolPromise
};
