const {v4 : uuidv4} = require('uuid');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const util = require("util");

const registerUserService = async(username, email, password) => {
    const existingUser = await User.findOne({
        $or : [{username}, {email}] // username 또는 email 중 하나라도 존재하는지 확인
    });

    if(existingUser ){
        throw new Error('The username or email is already in use');
    }

    const newUser = new User({username, email, password});
    await newUser.save();

    return {message : 'User registered successfully', redirect: "/login"};
}; 

const authenticateUser = async(identifier, password) => {
    // identifier가 이메일인지, 사용자명인지 확인하여 검색
    const user = await User.findOne({
        $or : [{email : identifier}, {username : identifier}]
    }).select('+password'); // 비밀번호 필드 포함

    // 보안 강화를 위한 비밀번호 해시 비교(timingSafeEqual 사용)
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Invalid username or password')
    }
    return user;
}

// 로그아웃
const logoutUser = async (req) => {
    const destroySession = util.promisify(req.session.destroy).bind(req.session);
    await destroySession();
};



module.exports = {
    registerUserService,
    authenticateUser,
    logoutUser
};