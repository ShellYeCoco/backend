var express = require('express');
var router = express.Router();
const { createToken } = require('../utils/jwt')
const db = require('../database')
const tokenMiddleware = require('../middleware/token')

/* GET users listing. */
router.get('/token', function(req, res, next) {
	const { username, password } = req.query
	if ( !username || !password ) {
		res.send({code: -1, message: '缺少参数'})
	} else {
		res.send(createToken({
			username,
			password
		}))
	}
});

router.post('/login', function(req, res, next) {
	const { username, password } = req.body
	console.log(username, password, req.body)
	if ( !username || !password ) {
		res.send({code: 0, msg: '缺少用户名或密码'})
	} else {
		db.select('*').from('user').where('username', username).queryRow().then(data => {
			console.log(data)
			if ( data ) {
				if ( data.password == password ) {
					const token = createToken({
						username,
						admin: data.admin,
						power: data.power
					})
					res.send({code: 200, data: {
						userInfo: data,
						token
					}});
				} else {
					res.send({code: 0, msg: '密码错误'})
				}
			} else {
				res.send({code: 0, msg: '您不是项目组成员'})
			}
		})
	}
});

router.get('/info', tokenMiddleware, (req, res, next) => {
	res.send({code: 200, data: req.query.userInfo})
})

module.exports = router;
