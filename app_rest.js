const express = require('express');
const { sequelize, User, Blog,Sale,Rod } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const korisnici = require('./routes/korisnici');
const blogovi = require('./routes/blogovi');
const stapovi = require('./routes/stapovi');
const akcije = require('./routes/akcije');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use('/korisnici', korisnici);
app.use('/blogovi', blogovi);
app.use('/stapovi', stapovi);
app.use('/akcije', akcije);




app.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});