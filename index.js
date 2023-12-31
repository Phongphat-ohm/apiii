const express = require('express');
const app = express();
const conn = require('./conn');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/api.png', (req, res)=>{
    res.sendFile(__dirname + "/public/api.png");
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

// Select
app.get('/get', (req, res) => {
    var sql = "SELECT * FROM users"

    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    })

})

app.get('/get/where', (req, res) => {
    const Email = req.query.email;

    var sql = "SELECT * FROM users WHERE Email = ?";

    conn.query(sql, [Email], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    })
})

// Insert
app.post('/insert', (req, res) => {
    var email = req.query.email;
    var password = req.query.password;

    var sqlSelect = "SELECT * FROM users WHERE Email = ?";

    conn.query(sqlSelect, [email], (err, result, fields) => {
        if (err) throw err;
        if (result == '') {
            var sqlInsert = `INSERT INTO users(Email, Password, Time) VALUES (?, ?, 0.00)`;

            conn.query(sqlInsert, [email, password], (err, result, fields) => {
                if (err) throw err;
                res.send({
                    Status: 200,
                    Message: "Goodddd..."
                });
            });
        } else {
            res.send({
                Status: 400,
                Message: "This email already exists"
            });
        }
    })
})

// Update
app.get('/update', (req, res) => {
    const email = req.query.email;
    const time = req.query.time;

    var sql = "UPDATE `users` SET `Time`=? WHERE Email = ?";

    conn.query(sql, [time, email], (err, result, fields) => {
        if (err) throw err;
        res.send({
            Status: 200,
            Message: "Good..."
        })
    })
})

// Delete
app.get('/delete', (req, res) => {
    var email = req.query.email;

    var sql = "DELETE FROM users WHERE Email = ?";

    conn.query(sql, [email], (err, result, fields) => {
        if (err) throw err;
        res.send({
            Status: 200,
            Message: "Good..."
        })
    })
})

app.post('/login', (req, res) => {
    const Email = req.query.email;
    const Password = req.query.password;

    var select = "SELECT * FROM users WHERE Email = ?";

    conn.query(select, [Email], (err, result, fields) => {
        if (err) throw err;
        if (result == '') {
            res.send({
                Status: 400,
                Message: "Not found email",
                Email: Email
            })
        } else {
            const r = result[0]
            if (r.Password === Password) {
                res.send({
                    Status: 200,
                    Message: "Login Success",
                    UserDetail: r
                })
            } else {
                res.send({
                    Status: 400,
                    Message: "Password not correct"
                })
            }
        }
    })
})

app.post('/register', (req, res) => {
    var email = req.query.email;
    var password = req.query.password;

    var sqlSelect = "SELECT * FROM users WHERE Email = ?";

    conn.query(sqlSelect, [email], (err, result, fields) => {
        if (err) throw err;
        if (result == '') {
            var sqlInsert = `INSERT INTO users(Email, Password, Time) VALUES (?, ?, 0.00)`;

            conn.query(sqlInsert, [email, password], (err, result, fields) => {
                if (err) throw err;
                res.send({
                    Status: 200,
                    Message: "Goodddd...",
                    UserDis: {
                      Email: email,
                      Pasword: password
                    }
                });
            });
        } else {
            res.send({
                Status: 400,
                Message: "This email already exists"
            });
        }
    })
})

// Song API

// Get Song
app.get('/song/get', (req, res)=>{
    var sql = "SELECT * FROM song"
    conn.query(sql, (err, result, fields)=>{
        if(err)throw err;
        res.send(result)
    })
})

// Add Song
app.post("/song/insert", (req, res)=>{
    const src = req.query.src
    const name = req.query.name

    const sql = `INSERT INTO song(src, name) VALUES (?,?)`;

    conn.query(sql, [src, name], (err, result, fields)=>{
        if(err)throw err;
        res.send({
            Status: 200,
            Message: "Insert Success"
        })
    })
})

// More Insert
// app.post('/song/insert/more', (req, res)=>{
//     const body = req.body

//     for(var i=0; i<body.length; i++){
//         var src = body[i].src
//         var name = body[i].name

//         const sql = `INSERT INTO song(src, name) VALUES (?,?)`;

//         conn.query(sql, [src, name])
//     }

//     res.send({
//         Status: 200,
//         Message: "Insert Success"
//     })
// })

app.listen('3200', () => {
    console.log("Listening");
})
