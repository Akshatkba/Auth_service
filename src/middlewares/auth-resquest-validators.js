const ValidateUserSignup = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: 'Email or password is missing in your request'
        })
    }
    next();
}

module.exports = {
    ValidateUserSignup
}