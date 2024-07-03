module.exports = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    ); // Allow specific methods
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    ); // Allow specific headers

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
};
