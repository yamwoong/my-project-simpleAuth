const bcrypt = require('bcrypt');

/**
 * 비밀번호를 해싱(암호화)하는 함수
 * @param {string} password - 원본 비밀번호
 * @returns {Promise<string>} - 해싱된 비밀번호 반환
 */
const hashPassword = async(password) => {
    // console.log('Password******************************hashPassword', password);

    return await bcrypt.hash(password, 10);
}

//비밀번호 검증
const comparePassword = async(inputPassword, hashePassword) => {
    return await bcrypt.compare(inputPassword, hashePassword);
}

module.exports = {hashPassword, comparePassword};