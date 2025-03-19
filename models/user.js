const mongoose = require('mongoose');
const hashMiddleware = require('../middlewares/hashMiddleware');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] // 이메일 형식 검증
    },
    password : {
        type : String,
        required : true
    },
    resetpasswordtoken : {type : String}, // 비밀번호 재설정 토큰
    resetpasswordexpires : {type : Date} // 토큰 만료 시간
});

// 비밀번호 해싱(저장 전에 실행)
userSchema.pre('save', hashMiddleware);

module.exports = mongoose.model('User', userSchema);