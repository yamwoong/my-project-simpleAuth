const express = require('express');
const passwordController = require("../controllers/passwordController");

const router = express.Router();

// 비밀번호 재설정 요청 (이메일 입력 -> 토큰 생성 & 이메일 전송)
router.post('/request-reset', passwordController.requestPasswordReset);

// 비밀번호 재설정 (토큰 검증 -> 새 비밀번호 저장)
router.post('/reset', passwordController.resetPassword);

module.exports = router;
