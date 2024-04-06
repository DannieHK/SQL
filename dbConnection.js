import dotenv from 'dotenv/config';
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to get a connection from the pool
async function getConnection() {
    const connection = await pool.getConnection();
    return connection;
}

export default getConnection;
