import getConnection from './dbConnection.js';

const createCompaniesTable = async () => {
    try {
        const connection = await getConnection();
        await connection.execute(`
        CREATE TABLE IF NOT EXISTS companies (
            client_id INT,
            company_cvr VARCHAR(255),
            company_name VARCHAR(255),
            company_email VARCHAR(255),
            company_phone1 BIGINT,
            company_phone2 BIGINT,
            company_phone3 BIGINT,
            company_address VARCHAR(255),
            company_zipcode INT,
            company_city VARCHAR(255),
            company_info VARCHAR(255),
            company_note VARCHAR(500),
            company_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (client_id) REFERENCES clients(client_id)
        );
    `);
        connection.release();
        //console.log("Companies table created successfully");
    } catch (error) {
        console.error("Error creating companies table: ", error);
    }
    // } finally {
    //     connection.release();
    // }
};

export { createCompaniesTable };
