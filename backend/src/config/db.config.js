import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function checkDBConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connection successful!");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};

export default { pool, checkDBConnection };
