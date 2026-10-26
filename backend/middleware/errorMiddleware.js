const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode || err.status || (res.statusCode === 200 ? 500 : res.statusCode);

    if (statusCode >= 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;
