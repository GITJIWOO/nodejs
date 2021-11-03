const fs = require('fs');

// 비동기 방식 순서 랜덤
fs.readFile('./README.md', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});

fs.readFile('./README.md', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});

fs.readFile('./README.md', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});

fs.readFile('./README.md', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('4번', data.toString());
});

// async function 예제
async function main() {
    let data = await fs.readFile('./README.md');
    console.log('1번', data.toString());
    data = await fs.readFile('./README.md');
    console.log('2번', data.toString());
    data = await fs.readFile('./README.md');
    console.log('3번', data.toString());
    data = await fs.readFile('./README.md');
    console.log('4번', data.toString());
}
main();