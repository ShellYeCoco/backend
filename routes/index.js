var express = require('express');
var router = express.Router();
const db = require('../database')
const path = require('path')

// web 程序
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/web/index.html'))
})

// 获取主页数据
router.get('/init', async function(req, res, next) {
    const staffCount = await db.select('count(*)').from('user').queryValue()
	const goodsCount = await db.select('count(*)').from('goods').queryValue()
	const orderCount = await db.select('count(*)').from('orders').queryValue()
	const orderList = await db.select("DATE_FORMAT(create_time, '%Y-%m-%d') as ymd, sum(number) as num, sum(money) as money").from('orders').groupby('ymd').queryList()
	res.send({
		code: 200,
		data: {
			staffCount,
			goodsCount,
			orderCount,
			orderList
		}
	})
});

module.exports = router;
