const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));




app.post('/login', (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
    User.findOne({ where: { username: req.body.name } })
        .then( usr => {
           console.log("Usao");

            if (bcrypt.compareSync(req.body.password, usr.password)) {

                
               
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    role:usr.role
                };
                
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
                
            } else {
                
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json({ msg: "No user in database"}));
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});