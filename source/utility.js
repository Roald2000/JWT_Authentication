
import mysql from 'mysql';
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from './config.js';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

const exequteQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const sanitizeString = (input) => {
    return mysql.escape(input);
};

const setResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({ message, ...data });
};

export { exequteQuery, sanitizeString, setResponse };