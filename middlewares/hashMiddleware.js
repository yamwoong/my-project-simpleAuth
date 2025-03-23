// 비밀번호를 자동으로 해싱하는 미들웨어

const {hashPassword} = require('../utils/authUtils');

/**
 * 비밀번호 해싱 미들웨어 (User 모델에서 `pre('save', hashMiddleware)`로 사용됨)
 * - 회원가입 시, 또는 비밀번호 변경 시 비밀번호를 자동으로 해싱하여 저장
 * - 이미 해싱된 비밀번호가 다시 해싱되는 "이중 해싱"을 방지함
 */
const hashMiddleware = async function (next) {
    if (!this.isModified("password")) {
        return next(); // 변경되지 않으면 해싱하지 않음
    }
    this.password = await hashPassword(this.password); // 새로운 비밀번호만 해싱
    next();
};

module.exports = hashMiddleware;