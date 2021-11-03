const fs = require('fs');

// 동기 방식 순서 1, 2, 3, 4
let data = fs.readFileSync('./README.md');
console.log('1번', data.toString());
data = fs.readFileSync('./README.md');
console.log('2번', data.toString());
data = fs.readFileSync('./README.md');
console.log('3번', data.toString());
data = fs.readFileSync('./README.md');
console.log('4번', data.toString());