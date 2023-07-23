const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6634569',
    password: 'w37a4XfeKR',
    database: 'sql6634569',
    port: 3306
});

conn.connect((err) => {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MySQL:', err);
    } else {
        console.log('เชื่อมต่อกับ MySQL สำเร็จแล้ว!');
        // ทำการดำเนินการกับฐานข้อมูลที่นี่
    }
});

module.exports = conn;