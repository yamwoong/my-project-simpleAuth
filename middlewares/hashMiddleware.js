// 비밀번호를 자동으로 해싱하는 미들웨어

const {hashPassword} = require('../utils/authUtils');

/**
 * 비밀번호 해싱 미들웨어 (User 모델에서 `pre('save', hashMiddleware)`로 사용됨)
 * - 회원가입 시, 또는 비밀번호 변경 시 비밀번호를 자동으로 해싱하여 저장
 * - 이미 해싱된 비밀번호가 다시 해싱되는 "이중 해싱"을 방지함
 */
const hashMiddleware = async function (next) {
    // 비밀번호가 변경되지 않았다면 해싱하지 않고 다음 단계로 넘어감
    // `isModified("password")`: 비밀번호 필드가 변경되었는지 확인
    // `password.startsWith("$2b$10$")`: 이미 해싱된 값인지 체크 (bcrypt 해싱 값은 "$2b$10$..." 형식)
    if (!this.isModified("password") || !this.password || this.password.startsWith("$2b$10$")) {
        return next(); // 기존 비밀번호 유지하고 저장 진행
    }

    // 비밀번호가 변경된 경우에만 해싱 수행
    this.password = await hashPassword(this.password); // 10번의 saltRounds를 사용하여 비밀번호 해싱

    next(); // 다음 미들웨어 또는 저장 로직 실행
};

module.exports = hashMiddleware;