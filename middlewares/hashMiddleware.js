// 비밀번호를 자동으로 해싱하는 미들웨어

const {hashPassword} = require('../utils/authUtils');

const hashMiddleware = async function(next) {
    if(!this.isModified('password')) return next();   // 비밀번호 변경 없으면 해싱 안 함
    this.password = await hashPassword(this.password) // 비밀번호 해싱
    next();
}

module.exports = hashMiddleware;