module.exports = (req, res, next) => {
    const { s_name, s_phone, s_password } = req.body;

    if ( req.path === '/shop-login') {
        if(![s_phone, s_password].every(Boolean)) {
            return res.status(401).json({
                message: 'Please enter all the required fields'
            });
        }
    }

    next();
};