module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        message: error && error.message ? error.message : 'An unknown error occurred'
    });
};
