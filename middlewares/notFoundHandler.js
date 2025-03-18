const notFoundHandler = (req, res, next) => {
    res.status(404).send("요청하신 페이지를 찾을 수 없습니다!");
};

module.exports = notFoundHandler;