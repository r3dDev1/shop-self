const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: 'C11l08a@89'
})

module.exports = pool.promise();