const bcrypt = require('bcrypt');

// 비밀번호 해싱
const hashPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}

//비밀번호 검증
const comparePassword = async(inputPassword, hashePassword) => {
    return await bcrypt.compare(inputPassword, hashePassword);
}

module.exports = {hashPassword, comparePassword};