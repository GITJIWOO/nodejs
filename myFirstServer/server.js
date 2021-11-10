const express = require('express');
const path = require('path');



const router = express();

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, './main.html'));
});

router.post('/login', (req, res) => {
    req.on('data', (data) => {
        console.log(JSON.parse(data));
    });
});

router.use((err, req, res, next) => {
    console.error(err);
});

router.listen(3030, () => {
    console.log('3030번 포트 서버 실행');
});