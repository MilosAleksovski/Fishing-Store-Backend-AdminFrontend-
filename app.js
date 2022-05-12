const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
   
    if (token == null) return res.redirect('/admin/login');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect('/admin/login');
        
        console.log(user);
        console.log(user.userId);
        req.user = user;
    
        next();
    });
}


app.get('/admin/mainpanel',authToken, (req, res) => {
    const cookies = getCookies(req);
    const token = cookies['token'];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(user.role == "Admin"){
            res.sendFile('index.html', { root: './static/admin' });
        }
        else{
            res.sendFile('indexMod.html', { root: './static/admin' });
         }
       
    });

    
});



app.get('/admin',authToken, (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});


app.get('/admin/login', (req, res) => {
    console.log("admin LOGIIN");
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin/korisnici',authToken, (req, res) => {
    res.sendFile('korisnik.html', { root: './static/admin' });
});


app.get('/admin/blogovi',authToken, (req, res) => {
    res.sendFile('blogovi.html', { root: './static/admin' });
});

app.get('/admin/akcije',authToken, (req, res) => {
    res.sendFile('akcije.html', { root: './static/admin' });
});

app.get('/admin/stapovi',authToken, (req, res) => {
    res.sendFile('stapovi.html', { root: './static/admin' });
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});