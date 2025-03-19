const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회웓가입 페이지 렌더링
router.get('/register', authController.renderRegisterForm);

// 회원가입 처리
router.post('/register', authController.register);

// 로그인 페이지 렌더링
router.get('/login', authController.renderLoginPage);

// 로그인 요청 처리(세션 방식)
router.post('/login', authController.loginUser);

// 대시보드 페이지
router.get('/dashboard', authController.dashboard);

// 로그아웃 요청 처리
router.post('/logout', authController.logoutUser);

// 비밀번호 재설정 요청
// router.post('/forgot-password', authController.forgotPassword);

module.exports = router;