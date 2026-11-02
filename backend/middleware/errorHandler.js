function errorHandler(err, req, res, next) {
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate value already exists"
        });
    }

    if (err.name === "ValidationError" && err.errors) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map((item) => item.message)
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid identifier"
        });
    }

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON in request body"
        });
    }

    const code = err.statusCode || err.status;
    const status =
        Number.isInteger(code) && code >= 400 && code < 600 ? code : 500;

    if (status >= 500) {
        console.error(err);
    }

    res.status(status).json({
        success: false,
        message: status === 500 ? "Internal server error" : err.message
    });
}

module.exports = errorHandler;