const { checkToken } = require('../utils/jwt')

const checkAdmin = (req, res, next) => {
    const { token } = req.method == 'GET' ? req.query : req.body
    if ( token ) {
        checkToken(token).then(data => {
            if ( req.method == 'GET' ) {
                req.query.userInfo = data
            } else {
                req.body.userInfo = data
            }

            // 获取到了用户信息 - admin
            const admin = data.admin
            const routepath = req.baseUrl + req.path
            const superAdminRoute = [
                '/goods/add',
                '/goods/delete',
                '/goods/typedelete',
                '/goods/typeadd',
                '/staff/add',
                '/staff/delete',
                '/staff/edit'
            ]
            const managerRoute = [
                '/goods/onsale'
            ]

            if ( superAdminRoute.indexOf(routepath) != -1 && admin != 1 ) {
                res.send({code: 0, msg: '没有权限'})
            } else if ( managerRoute.indexOf(routepath) != -1 && (admin != 1 && admin != 2) ) {
                res.send({code: 0, msg: '没有权限'})
            } else {
                next()
            }
        }).catch(err => {
            res.send({code: 'token已过期'})
        })
    } else {
        res.send({code: 0, msg: '缺少token'})
    }
}

module.exports = checkAdmin