import getConnection from './dbConnection.js';

const createUsersTable = async () => {
    const connection = await getConnection();
    try {
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(225) UNIQUE,
                password VARCHAR(255),
                updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        //console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table: ", error);
    } finally {
        connection.release();
    }
};

const findUserByUsername = async (username) => {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    } finally {
        connection.release();
    }
};

const createUser = async (username, password) => {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        return result.insertId;
    } finally {
        connection.release();
    }
};

export { createUsersTable, findUserByUsername, createUser };
