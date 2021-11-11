const express = require('express');
const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello User!');
});

router.route('/login') // 라우터 그룹화
    .get((req, res) => {
        res.send('Login GET');
    })
    .post((req, res) => {
        res.send('Login POST');
    });

router.get('/user/:id', (req, res) => {
    console.log(req.params, req.query); // req.params는 동적으로 변하는 매개변수, 쿼리스트링이 붙는 경우 req.query
});

module.exports = router; // 라우터 exports