var express = require('express');
var router = express.Router();
const db = require('../database');
const { route } = require('./upload');
const checkAdmin = require('../middleware/checkAdmin')
const tokenMiddleware = require('../middleware/token')

// 添加商品
router.post('/add', checkAdmin, function(req, res) {
    const { name, pic, mediumPrice, bigPrice, specifications, sugar, temperature, type } = req.body
    if ( !name || !pic || !mediumPrice || !bigPrice || !type || !specifications || !sugar || !temperature ) {
        res.send({code: 0, msg: '请讲信息填写完整'})
    } else {
        console.log('submit')
        db.insert('goods')
        .column('name', name)
        .column('pic', pic)
        .column('type', type)
        .column('medium_price', mediumPrice)
        .column('big_price', bigPrice)
        .column('specifications', specifications)
        .column('sugar', sugar)
        .column('temperature', temperature)
        .execute()
        .then(() => {
            res.send({code: 200})
        })
        .catch(() => {
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
});

// 获取商品列表
router.get('/list', tokenMiddleware, (req, res) => {
    const { page, name, type } = req.query
    const page_size = 10

    if ( name && (type && type != 'all') ) {
        db.select('*').from('goods').where('name', name, 'like').where('type', type).orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows.map(item => {
                        item.pic = `http://127.0.0.1:3001/upload/goodsPic/${ item.pic }`
                        return item
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( name ) {
        db.select('*').from('goods').where('name', name, 'like').orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows.map(item => {
                        item.pic = `http://127.0.0.1:3001/upload/goodsPic/${ item.pic }`
                        return item
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( type && type != 'all' ) {
        db.select('*').from('goods').where('type', type).orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows.map(item => {
                        item.pic = `http://127.0.0.1:3001/upload/goodsPic/${ item.pic }`
                        return item
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else {
        db.select('*').from('goods').orderby('create_time desc').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: {
                    page: {
                        page,
                        total: data.total,
                        page_size
                    },
                    list: data.rows.map(item => {
                        item.pic = `http://127.0.0.1:3001/upload/goodsPic/${ item.pic }`
                        return item
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 删除商品
router.get('/delete', checkAdmin, (req, res) => {
    const { id } = req.query
    if ( !id ) {
        res.send({code: 0, msg: '缺少参数'})
    } else {
        db.delete('goods').where('id', id).execute().then(() => {
            res.send({code: 200})
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 商品上下架
router.get('/onsale', checkAdmin, (req, res) => {
    const { id, status } = req.query
    if ( !id || !status ) {
        res.send({code: 0, msg: '缺少参数'})
    } else {
        db.update('goods').where('id', id).column('on_sale', status).execute().then(() => {
            res.send({code: 200})
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 商品类型列表
router.get('/typelist', tokenMiddleware, (req, res) => {
    db.select('*').from('goods_type').queryList().then(data => {
        res.send({code: 200, data})
    }).catch(err => {
        console.log(err)
        res.send({code: 0, msg: '系统繁忙'})
    })
})

// 删除商品类型
router.get('/typedelete', checkAdmin, (req, res) => {
    const { id } = req.query

    if ( !id ) {
        res.send({code: 0, msg: '缺少id'})
    } else {
        db.delete('goods_type').where('id', id).execute().then(() => {
            res.send({code: 200})
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 添加商品类型
router.get('/typeadd', checkAdmin, (req, res) => {
    const { type } = req.query

    if ( !type ) {
        res.send({code: 0, msg: '缺少type'})
    } else {
        db.insert('goods_type').column('type', type).execute().then(() => {
            res.send({code: 200})
        })
        .catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

module.exports = router;