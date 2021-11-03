const http = require('http'); // http library

const server = http.createServer((req, res) => { // server instance
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello World!</h1>');
}).listen(8080); // 포트 번호 지정

server.on('listening', () => { // listen on
    console.log('8080번 포트에서 서버 대기중');
});
server.on('error', (error) => { // listen on error
    console.log(error);
});