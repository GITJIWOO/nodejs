const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express();

const getJson = () => 
    JSON.stringify({
        'method': 'GET',
        'num': Math.floor((Math.random() * 100) + 1),
    });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, './main.html'));
});

router.post('/login', (req, res) => {
    const id = req.body.id;
    console.log(id);
    res.json({
        id: id
    });
});

router.use((err, req, res, next) => {
    console.error(err);
});

router.listen(3030, () => {
    console.log('3030번 포트 서버 실행');
});