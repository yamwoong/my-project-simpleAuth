const { requestPasswordReset } = require("./services/passwordService"); // 서비스 경로 맞춰서 변경
const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
    try {
        // MongoDB 연결 (테스트 실행 시 필요)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ DB 연결 성공!");

        // 테스트할 이메일 입력
        const testEmail = "123";  // 실제 테스트할 이메일로 변경

        // 함수 실행
        await requestPasswordReset(testEmail);

        console.log("✅ 비밀번호 재설정 요청 성공! 이메일을 확인하세요.");
    } catch (error) {
        console.error("❌ 테스트 실패:", error.message);
    } finally {
        mongoose.connection.close(); // 테스트 후 DB 연결 종료
    }
})();
