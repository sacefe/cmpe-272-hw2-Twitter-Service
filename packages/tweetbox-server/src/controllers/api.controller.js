export const getApiStatus = async function(req, res, next) {
    res.status(200).json({
        message: 'Ok.'
    })
    next();
}