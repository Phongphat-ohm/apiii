const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'containers-us-west-180.railway.app',
    user: 'root',
    password: 'QohUWiZZnqaEDC4t1Dr8',
    database: 'railway',
    port: 5786
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