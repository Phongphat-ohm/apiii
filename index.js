const express = require('express');
const app = express();
const conn = require('./conn');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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
    let Email = req.query.email;
    let Password = req.body.password;

    var selectSql = "SELECT * FROM  users WHERE Email = ?";

    conn.query(selectSql, [Email], (err, result, firelds) => {
        if (err) throw err;
        if (result == '') {
            var insertSql = "INSERT INTO users(Email, Password, Time) VALUES (?, ?, 0.00)";

            conn.query(insertSql, [Email, Password], (err, result, fields) => {
                if (err) throw err;
                res.send({
                    Status: 200,
                    Message: "Register Success",
                    UserDisp: {
                        Email: Email,
                        Password: Password,
                        Time: 0.00
                    }
                })
            })
        } else {
            res.send({
                Status: 400,
                Messgae: "This email already exists"
            })
        }
    })
})

app.listen('3200', () => {
    console.log("Listening");
})
