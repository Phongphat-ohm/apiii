const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_ppkxb15',
    password: 'kb@6QSNYs5PK%W*',
    database: 'freedb_ppkxb15',
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
