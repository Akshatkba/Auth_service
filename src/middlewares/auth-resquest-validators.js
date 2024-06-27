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

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Somehting went wrong'
        });
    }
    next();
}

module.exports = {
    ValidateUserSignup,
    validateIsAdminRequest
}