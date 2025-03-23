const passwordService = require('../services/passwordService');
const asyncHandler = require('../utils/asyncHandler') // 비동기 오류 처리를 위한 미들웨어


/**
 * 비밀번호 찾기 페이지 렌더링
 */
const renderForgotPasswordPage = (req, res) => {
    res.render('password/forgotPassword'); // EJS 파일 렌더링
};


/**
 * 비밀번호 재설정 요청 컨트롤러
 * - DB에서 회원 이메일을 가져와 비밀번호 재설정 이메일을 보냄
 */
const requestPasswordReset = asyncHandler(async (req, res) => {
        console.log("📌 [SERVER] 요청 데이터:", req.body); // 🔍 요청 데이터 확인

        // DB에서 가져온 사용자 이메일 사용 (req.user.email)
        const {username} = req.body;

        await passwordService.requestPasswordReset(username);
        res.status(200).json({ message: '비밀번호 재설정 이메일을 전송했습니다.' });
});

const resetPassword = asyncHandler(async(req, res) => {
    // 클라이언트 요청(req.body)에서 토큰, 새 비밀번호, 비밀번호 확인 값 추출
    const {token, password} = req.body;

    // 서비스 로직을 호출하여 비밀번호 변경 실행
    const message = await passwordService.resetPassword(token, password);

    // 성공 응답 반환
    res.status(200).json({message});
});

// 비밀번호 재설정 페이지 렌더링링
const renderResetPasswordPage = (req, res) => {
    const { token } = req.query;  // 🔹 쿼리 스트링에서 토큰 추출

    if (!token) {
        return res.status(400).json({ message: "유효하지 않은 비밀번호 재설정 요청입니다." });
    }

    res.render("password/resetPassword", { token }); // 🔹 EJS 파일 렌더링
};


module.exports = {
    requestPasswordReset,
    renderForgotPasswordPage,
    resetPassword,
    renderResetPasswordPage
};