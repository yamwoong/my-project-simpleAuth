const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
require('dotenv').config(); // 환경 변수 로드드

const app = express();


//*************************미들웨어 설정*******************************/

app.use(express.urlencoded({ extended: true })); // 폼 데이터 파싱
app.use(express.json()); // JSON 요청 처리
app.use(methodOverride('_method')); // HTML 폼에서 PUT, DELETE 사용 가능하게 설정
app.use(express.static('public')); // 정적 파일 제공 (CSS, JS 등)
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정

//*******************************************************************/

//mongoDB 연결
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/simpleAuth');
        console.log("MongoDB 연결 성공!");
    } catch (err) {
        console.error("MongoDB 연결 실패:", err);
        process.exit(1); // 연결 실패 시 서버 종료
    }
};
connectDB();

// 세션설정 (DB에 저장)
app.use(session({
    secret : process.env.SECRET_KEY || 'supersecretkey', // 환경 변수로 관리
    resave : false,
    saveUninitialized : false, // 로그인한 사용자만 세션 저장
    store: MongoStore.create({ // MongoDB에 세션 저장
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/simpleAuth',
        collectionName: 'sessions' // 세션을 저장할 컬렉션 이름
    }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
}));



// 라우트 설정
app.use(authRoutes); // 인증 관련 라우트 연결

// 홈 페이지
app.get('/', (req, res) => {
    res.send('home');
});

// 404 처리 미들웨어 추가
app.use(notFoundHandler);

// 에러 처리 미들웨어
app.use(errorHandler); 


//서버 실행 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중 => http://localhost:${PORT}`);
})