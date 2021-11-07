const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000); // 전역 변수

app.get('/app', (req, res) => { // localhost:3000/app의 주소로 접속 가능
    res.send('hello express');
});

app.listen(3000, () => {
    console.log('익스프레스 실행');
});