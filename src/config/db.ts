
import mysql from 'mysql2/promise';

const getConnection = async () => {
    const connection = await mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'nodejspro'
    });
    console.log("Connected to MySQL database");

    return connection;
}

export default getConnection;
