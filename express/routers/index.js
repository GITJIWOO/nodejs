const express = require('express');
const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router; // 라우터 exports