var express = require('express');
var router = express.Router();
const db = require('../database')
const tokenMiddleware = require('../middleware/token')

// 获取商品列表
router.get('/goodlist', tokenMiddleware, function(req, res, next) {
    db.select('*').from('goods').queryList().then(data => {
        res.send({code: 200, data: data})
    }).catch(err => {
        console.log(err)
        res.send({code: 0, msg: '系统繁忙'})
    })
});

// 提交商品订单
router.post('/submit', tokenMiddleware, (req, res) => {
    const { id, goods_name, goods_type, specification, temperature, sugar, number, remark, price } = req.body
    if ( !id || !goods_name || !goods_type || !specification || !temperature || !sugar || !number ) {
        res.send({code: 0, msg: '缺少参数'})
    } else {
        db.insert('orders')
        .column('goods_id', id)
        .column('goods_name', goods_name)
        .column('goods_type', goods_type)
        .column('cup', specification)
        .column('temperature', temperature)
        .column('sugar', sugar)
        .column('number', number)
        .column('remark', remark)
        .column('money', price)
        .execute()
        .then(() => {
            res.send({code: 200})
        })
        .catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 获取订单列表
router.get('/list', tokenMiddleware, (req, res) => {
    const { page, keyword, type } = req.query
    const page_size = 10
    if ( keyword && (type && type != 'all') ) {
        db.select('*').from('orders').where('goods_name', keyword, 'like').where('goods_name', type).orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( keyword ) {
        db.select('*').from('orders').where('goods_name', keyword, 'like').orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( type && type != 'all' ) {
        db.select('*').from('orders').where('goods_name', type).orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else {
        db.select('*').from('orders').orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

module.exports = router;
