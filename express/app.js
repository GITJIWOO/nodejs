const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

// 라우터 파일 불러오기
const indexRouter = require('./routers/index');
const userRouter = require('./routers/user');

// 순서
// 1. 필요한 패키지 require 후 app 설정
// 2. 변수 설정
// 3. 공통 미들웨어
// 4. 라우터 작성(범위가 넓은 라우터를 밑으로)
// 5. 에러 라우터 작성

// dotenv
// 비밀 키들을 관리할 수 있는 패키지 시스템에 따른 설정도 관리할 수 있다.
// 암호키들을 변수처럼 만들어줘서 보안에 좋다.
const dotenv = require('dotenv'); // dotenv는 require 밑에 놓는 것이 좋다.
dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000); // 포트 전역 변수


// morgan은 서버의 응답 상태를 알려준다.(ex. GET /app 200 2.5 ms - 9(바이트))
// 'dev'는 개발자용(상태만), 'combined'는 배포용(시간, 누구 등)
app.use(morgan('dev')); 

// express.static
// 경로를 다르게 만들 수 있다. 보안에 좋다.
// 정적파일을 우선으로 호출하는 것이 성능에 좋기 때문에 상단에 위치해놓는다.(morgan 상단에 놓으면 기록을 안남기게 할 수 있다.)
// localhost:3000/main.html                     learn-express/public-3000/main.html
app.use('/', (req, res, next) => { // 미들웨어 확장법
    try {
        if(req.session) { // 로그인 상태
            express.static(__dirname + 'public-3000')(req, res, next);
        } else { // 비로그인 상태
            next();
        }
    } catch (err) {
        console.error(err);
    }
}); // html, css같은 정적파일을 받는 주소 설정

app.use(cookieParser(process.env.COOKIE_SECRET)); // 데이터가 있을 경우 쿠키 서명

// express.session
// 개인의 저장공간을 만들어줌
app.use(session({
    resave: false,
    saveUninitialized : true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // http only를 해놔야 자바스크립트로 공격당하지 않는다.
    },
    name: 'connect.sid',
}));

app.use(express.json); // json 데이터를 받는 구문

// express.urlencoded
// 미들웨어의 여러 옵션 중에 하나로 false 값일 시 node.js에 기본으로 내장된 queryString,
// true 값일 시 따로 설치가 필요한 npm qs 라이브러리를 사용한다.
app.use(express.urlencoded({ extended: true }));

app.use('/index', indexRouter);
app.use('/user', userRouter); // user.js파일의 주소가 /라면 /user/ 이다.


// 파일 업로드
try { // 폴더 여부에 따라 폴더 생성
    fs.readdirSync('uploads');
} catch (error) {
    console.error('업로드 폴더가 없어 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

// multiple 업로드는 upload.array('image')
// 파일을 여러개 받는 경우 upload.fields([{ name: 'image1' }, { name: 'image2'}, { name: 'image3' }])
// 파일은 없지만 multipart 방식으로 넘어오는 경우 upload.none()
app.post('/upload', upload.single('image'), (req, res) => { // upload.single은 전역으로도 선언할 수 있지만 파일업로드는 자주 사용하지 않기 때문에 라우터 안에 넣는다.
    console.log(req.file); // multiple이면 req.files
    // req.body // none으로 받는 경우
    res.send('ok');
});


app.use((req, res, next) => { // 미들웨어 메서드는 모든 라우터에 공통적으로 실행된다.
    req.cookies // { mycookie: 'test' }
    req.signedCookies; // 서명한 쿠키

    res.cookie('name', encodeURIComponent(name), { // 쿠키 생성
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    /*
    res.clearCookie('name', encodeURIComponent(name), { // 쿠키 삭제
        httpOnly: true,
        path: '/',
    });
    */
    req.session.data = 'session데이터'; // 계속 유지하고 싶은 데이터
    req.data = '1회용 데이터'; // 비밀번호 같은 1회용 데이터

    console.log('모든 요청에 실행');
    next(); // next를 실행해줘야 다른 라우터들도 실행된다.
}, (req, res, next) => { // 미들웨어를 여러개 선언할 수도 있다.
    try {
        // console.log(sgharhwerh);
    } catch (err) {
        next(err); // next에 에러를 넣어서 에러 라우터로 넘어간다.
    }
});

app.get('/', (req, res, next) => {

    req.session // 사용자의 대한 고유 세션을 가져온다.
    req.session.id = 'hello'; // 이 주소로 들어온 사용자의 세션이 모두 hello로 변형

    req.session.data // 다회용 데이터
    req.data // 1회용 데이터

    // res.json({ hello: 'Hello' }); // express식 json전달 방식
    res.sendFile(path.join(__dirname, './index.html'));
    if(false) {
        res.next('route'); // next안에 'route'를 적는다면 다음 라우터로 넘어간다.(아래에 있는 라우터는 실행되지 않는다.)
    } else {
        res.next();
    }
}, (req, res) => {
    console.log('실행되나요?');
});

app.get('/category/:name', (req, res) => { // 와일드카드 라우트
    res.send('hello ${req.params.name}'); // send가 두 번 이상 실행되면 에러가 난다.(미들웨어 포험)
});

app.get('/app', (req, res) => {
    // res.writeHead(200, { 'Content-Type': 'text/plain'; charset=utf-8' }); // writeHead가 send 아래에 있다면 에러
    res.setHeader('Content-Type', 'text/html'); // express Header 설정이 있기 때문에 express식으로 사용하는게 좋다.
    res.send('hello express');
});

/*
app.use((req, res, next) => { // 404 에러 실행 라우트
    res.status(404).send('404 에러'); // status로 http 상태코드를 설정할 수 있다.
    // 보안을 위해 400, 500 번대는 조심해야 한다.
});
*/

app.use((err, req, res, next) => { // 에러 전용 라우트는 next까지 4개의 매개변수가 있어야 한다.
    console.error(err);
});

app.listen(3000, () => {
    console.log('익스프레스 실행');
});