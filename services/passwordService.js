const User = require('../models/user');
const { v4: uuidv4 } = require("uuid"); // uuid 패키지 사용
const sendEmail = require('../utils/sendEmail');
const authUtils = require("../utils/authUtils");


/**
 * 비밀번호 재설정 요청(이메일 전송)
 * @param {string} username - 사용자 이메일 주소 
 */
const requestPasswordReset = async(username) => {
    console.log('username', username);
    const user = await User.findOne({username});
    const email = user.email;
    console.log('email', email);
    if(!user) throw new Error('등록되지 않은 아이디입니다');

    // 랜덤한 재설정 토큰 생성
    const resetToken = uuidv4();

    // 생성한 토큰과 만료 시간 DB에 저장
    user.resetpasswordtoken = resetToken;
    user.resetpasswordexpires = Date.now() + 3600000; // 현재 시간 + 1시간
    await user.save(); // 변경사항을 DB에 저장

    // 비밀번호 재설정 링크 생성
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 사용자에게 이메일 전송
    await sendEmail(email, "비밀번호 재설정", `다음 링크에서 비밀번호를 변경하세요: ${resetLink}`);
};

/**
 * 비밀번호 재설정 함수
 * @param {string} token - 비밀번호 재설정을 위한 토큰
 * @param {string} newPassword - 사용자가 입력한 새 비밀번호
 */
const resetPassword = async(token, newPassword) => {

    // 토큰이 유효한지 확인 (토큰이 있고, 만료되지 않은 경우에만 찾기)
    const user = await User.findOne({
        resetpasswordtoken : token, // 저장된 토큰과 일치하는지 확인
        resetpasswordexpires : {$gt : Date.now()} // 현재 시간보다 이후면 유효한 토큰
    });

    // 사용자를 찾을 수 없거나 토큰이 만료된 경우 오류 발생
    if(!user) throw new Error('토큰이 유효하지 않거나 만료되었습니다.');

    // 새 비밀번호를 저장

    user.password = newPassword;

    // 보안을 위해 사용한 토큰 삭제(한 번 사용한 토큰은 다시 사용 불가능하도록)
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpires = undefined;

    // 변경된 정보를 저장
    await user.save();

    return { success: true, message: "비밀번호가 성공적으로 변경되었습니다." }; // ✅ JSON 반환 (Promise<object>)

};


module.exports = {
    requestPasswordReset,
    resetPassword
};