const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001); // process.env.PORT는 개발할 때와 배포할 때의 포트를 다르게 하기 위해 .env 파일에 PORT를 설정한다.
app.set('view engine', 'html'); // 넌적스 세팅
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // 정적파일들은 public 폴더안에 생성한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use('/', pageRouter);

app.use((req, res, next) => { // 404처리 미들웨어
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // 에러 전용 미들웨어
  res.locals.message = err.message; // 템플릿 엔진 변수
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500).render('error'); // error.html
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
