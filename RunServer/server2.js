const http = require('http');
const fs = require('fs').promises;

const server = http.createServer( async (req, res) => { // 서버 생성
    try { // async function
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const data = await fs.readFile('./server2.html');
        res.end(data);
    } catch (error) { // 서버 실행중 에러 처리
        console.error(error);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(error.message);
    }
}).listen(8080); // 포트 번호 지정

server.on('listening', () => { // 서버 생성 후 
    console.log('8080번 포트에서 서버 대기중');
});
server.on('error', (error) => { // 서버 대기중 에러 감지
    console.log(error);
});