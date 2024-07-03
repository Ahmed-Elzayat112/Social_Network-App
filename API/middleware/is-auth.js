const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers;
    if (!authHeader || !authHeader.authorization) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        const error = new Error("Invalid user!");
        error.statusCode = 401;
        throw error;
    }
    req.userId = userId;
    next();
};
