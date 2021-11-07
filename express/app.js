const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000); // 전역 변수

app.get('/', (req, res) => { // localhost:3000/app의 주소로 접속 가능
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/app', (req, res) => {
    res.send('hello express');
});

app.listen(3000, () => {
    console.log('익스프레스 실행');
});