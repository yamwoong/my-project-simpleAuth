// 비동기 함수 에러 처리하기 위해 사용
// controller에서 오류핸들러를 사용

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;