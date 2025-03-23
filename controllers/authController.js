const User = require('../models/user');
const asyncHandler = require('../utils/asyncHandler') // 비동기 오류 처리를 위한 미들웨어
const authService = require('../services/authService');


// 회원가입 처리
const register = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    const response = await authService.registerUserService(username, email, password);
    res.status(201).json(response);
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

    // 인증 서비스 호출
    const user = await authService.authenticateUser(identifier, password);

    // 세션에 사용자 정보 저장 (로그인 상태 유지)
    req.session.user = {
        id : user._id, 
        username: user.username,
        email: user.email
    };

    console.log("req.session.user", req.session.user);
    res.redirect('/dashboard');
});

// 대시보드 페이지 렌더링
const dashboard = (req, res) => {
    if(!req.session.user) {
        return res.redirect('/login'); // 로그인 안 한 사용자는 로그인페이지로 리디렉션
    }
    res.render('auth/dashboard', {user : req.session.user});
}

// 로그아웃 컨트롤러
const logoutUser = asyncHandler(async(req, res) => {
    await authService.logoutUser(req);
    res.clearCookie('connect.sid', { path: '/' }); // 쿠키 삭제
    res.redirect('/login');
});


module.exports = {
    register,
    renderRegisterForm,
    renderLoginPage,
    loginUser,
    dashboard,
    logoutUser
};