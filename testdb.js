const sql = require("mssql");
const config = require("./dbconfig");

async function testConnection() {
    try {
        await sql.connect(config);
        console.log("✅ MSSQL connected!");
    } catch (err) {
        console.error("❌ Failed to connect to MSSQL:", err.message);
    }
}

testConnection();
