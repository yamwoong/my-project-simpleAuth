const User = require('../models/user');
const asyncHandler = require('../utils/asyncHandler') // 비동기 오류 처리를 위한 미들웨어
const authService = require('../services/authService');


// 회원가입 처리
const register = asyncHandler(async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const response = await authService.registerUserService(username, email, password);
        res.status(201).json(response);
    } catch(error) {
        res.status(400).json({message : error.message});
    }
});

// 회원가입 페이지 렌더링
const renderRegisterForm = (req, res) => {
    res.render('auth/register'); // 회원가입 폼 렌더링링
};

// 로그인 페이지 렌더링
const renderLoginPage = (req, res) => {
    res.render('auth/login');
};

// 로그인 처리
const loginUser = asyncHandler(async(req, res) => {
    const {identifier, password} = req.body; // 사용자 입력 (이메일 또는 사용자명)
    console.log("identifier, password", identifier, password);
    try{
        // 인증 서비스 호출
        const user = await authService.authenticateUser(identifier, password);

        

        // 세션에 사용자 정보 저장 (로그인 상태 유지)
        req.session.user = {
            id : user._id, 
            username : user.username || user.email // username이 없으면 email 저장
        };

        console.log("req.session.user", req.session.user);

        res.redirect('/dashboard');
    } catch(error) {
        console.log("error", error);

        res.status(400).render('auth/login', {error : error.message}) // 로그인 실패 시 에러
    }
});



module.exports = {
    register,
    renderRegisterForm,
    renderLoginPage,
    loginUser
};