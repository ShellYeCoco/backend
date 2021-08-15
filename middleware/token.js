const { checkToken } = require('../utils/jwt')

const tokenMiddleware = (req, res, next) => {
    const { token } = req.method == 'GET' ? req.query : req.body
    if ( token ) {
        checkToken(token).then(data => {
            if ( req.method == 'GET' ) {
                req.query.userInfo = data
            } else {
                req.body.userInfo = data
            }
            next()
        }).catch(err => {
            res.send({code: 'token已过期'})
        })
    } else {
        res.send({code: 0, msg: '缺少token'})
    }
}

module.exports = tokenMiddleware