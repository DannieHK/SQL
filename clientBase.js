import getConnection from './dbConnection.js';

const createClientsTable = async () => {
    let connection;
    try {
        connection = await getConnection();
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS clients (
                client_id INT AUTO_INCREMENT PRIMARY KEY,
                client_ssn VARCHAR(255) UNIQUE,
                client_first_name VARCHAR(255),
                client_last_name VARCHAR(255),
                client_email VARCHAR(255),
                client_phone1 BIGINT,
                client_phone2 BIGINT,
                client_address VARCHAR(255),
                client_zipcode INT,
                client_city VARCHAR(255),
                client_start_date DATE,
                client_reference VARCHAR(255),
                client_note VARCHAR(500),
                client_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        //console.log("Clients table created successfully");
    } catch (error) {
        console.error("Error creating clients table: ", error);
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error("Error releasing connection: ", releaseError);
            }
        }
    }
};

export { createClientsTable };
