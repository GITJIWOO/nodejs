const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const router = express();

router.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
router.set('views', path.join(__dirname, './views'));

const getJson = () => 
    JSON.stringify({
        'method': 'GET',
        'num': Math.floor((Math.random() * 100) + 1),
    });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, './views/main.html'));
});

router.post('/login', (req, res) => {
    const id = req.body.id;
    res.render('welcome', {
        title: 'Login',
        id: id,
    });
});

router.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, './views/welcome.html'));
});

router.use((err, req, res, next) => {
    console.error(err);
});

router.listen(3030, () => {
    console.log('3030번 포트 서버 실행');
});