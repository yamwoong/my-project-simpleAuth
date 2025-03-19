const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

console.log("CLIENT_ID:", process.env.EMAIL_CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.EMAIL_CLIENT_SECRET);
console.log("REFRESH_TOKEN:", process.env.EMAIL_REFRESH_TOKEN);
console.log("USER_EMAIL:", process.env.EMAIL_USER);
console.log("REDIRECT_URI:", process.env.EMAIL_REDIRECT_URI);

//OAuth2 클라이언트 생성
const OAuth2Client = new google.auth.OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    process.env.EMAIL_REDIRECT_URI
);

console.log('OAuth2Client 생성 완료!');

// Refresh Token 설정
OAuth2Client.setCredentials({refresh_token : process.env.EMAIL_REFRESH_TOKEN});


/**
 * 이메일을 전송하는 함수
 * @param {string} to - 받는 사람 이메일 주소
 * @param {string} subject - 이메일 제목
 * @param {string} text - 이메일 본문 내용
 */

const sendEmail = async(to, subject, text) => {
    console.log('sendEmail 실행...');
    try{
        let accessToken;
        
        try {
            console.log("🔹 OAuth2 Access Token 요청 시작"); // 요청 시작 로그
        
            const accessTokenResponse = await OAuth2Client.getAccessToken();
        
            console.log("✅ Access Token Response:"); // 응답 확인
        
            accessToken = accessTokenResponse?.token;

            console.log("✅ accessToken", accessToken); // 응답 확인
            
            if (!accessToken) {
                console.error("Access Token을 가져오지 못했습니다:", accessTokenResponse);
                throw new Error("Access Token을 가져오지 못했습니다.");
            }
        } catch (error) {
            console.error("OAuth2 Access Token 요청 중 오류 발생:", error);
            throw new Error("OAuth2 Access Token 요청 실패!");
        }

        console.log('Access Token 발급 완료!', accessToken);



        // Nodemailer 설정 (OAuth2 인증)
        const transporter = nodemailer.createTransport({
            service : 'Gmail',
            auth : {
                type : 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.EMAIL_CLIENT_ID,
                clientSecret: process.env.EMAIL_CLIENT_SECRET,
                refreshToken: process.env.EMAIL_REFRESH_TOKEN,
                accessToken, // 새로 발급받은 Access Token 사용
            },
            logger: true,  // 이메일 전송 로그 출력
            debug: true  // 더 상세한 디버깅 로그 출력
        })

        console.log('Nodemailer Transporter 생성 완료!', transporter);

        // 이메일 전송
        await transporter.sendMail({
            from : `"YourApp" <${process.env.EMAIL_USER}>`,  // 보낸 사람 (이름과 이메일)
            to,         // 받는 사람 이메일
            subject,    // 이메일 제목
            text        // 이메일 본문 (HTML도 가능)
        });


        console.log("이메일 전송 성공!");
    } catch(err) {
        console.error("이메일 전송 실패:", err.message);
        throw err; // 예외를 다시 던져서 호출한 곳에서 처리 가능하게 함
    }
};

module.exports = sendEmail;