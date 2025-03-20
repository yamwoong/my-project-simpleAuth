const mongoose = require("mongoose");
require("dotenv").config();

const { resetPassword } = require("./services/passwordService");

// 테스트 실행 전 DB 연결
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ 테스트 파일: MongoDB 연결 성공!"))
.catch(err => console.error("❌ 테스트 파일: MongoDB 연결 실패:", err));

(async () => {
    try {
        const testToken = "66138ff5914cb1002fddee0d3f6411139fee3e6f83ed993cb7f11b21212ed4c9"; // DB에서 가져온 토큰
        const newPassword = '1'; // 새 비밀번호

        const result = await resetPassword(testToken, newPassword);
        console.log("✅ 비밀번호 변경 성공:", result);
    } catch (error) {
        console.error("❌ 비밀번호 변경 실패:", error.message);
    } finally {
        // 테스트 끝나면 DB 연결 종료 (안 하면 연결이 계속 유지됨)
        mongoose.connection.close();
    }
})();
