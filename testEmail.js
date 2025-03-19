const sendEmail = require('./utils/sendEmail'); // 만든 함수 불러오기

// 테스트할 이메일 정보
const to = "0206woong@gmail.com";
const subject = "테스트 이메일";
const text = "이것은 Nodemailer 이메일 테스트입니다.";

(async () => {
    try {
        await sendEmail(to, subject, text);
        console.log("✅ 이메일 테스트 성공!");
    } catch (error) {
        console.error("❌ 이메일 테스트 실패:", error.message);
    }
})();
