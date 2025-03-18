// 에러 처리 미들웨어
const errorHandler = ((err, req, res, next) => {
    console.error(err.stack); // 에러 로그 출력 (서버 콘솔)
    res.status(500).send("서버 오류가 발생했습니다!"); // 사용자에게 에러 메시지 응답
});

module.exports = errorHandler;