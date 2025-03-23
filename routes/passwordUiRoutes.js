const express = require('express');
const passwordController = require("../controllers/passwordController");

const router = express.Router();

// 비밀번호 재설정 요청 페이지 렌더링 (GET)
router.get('/forgot-password', passwordController.renderForgotPasswordPage);


// 비밀번호 재설정 페이지를 렌더링하는 라우트 (쿼리 스트링 방식)
router.get("/reset-password", passwordController.renderResetPasswordPage); // 🔹 새 비밀번호 입력 폼

module.exports = router;
