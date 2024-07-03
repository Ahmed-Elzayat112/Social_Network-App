module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.message);
    res.json({
        error: {
            message: error.message,
            data: error.data,
        },
    });
};
