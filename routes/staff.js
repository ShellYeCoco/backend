var express = require('express');
var router = express.Router();
const db = require('../database')
const checkAdmin = require('../middleware/checkAdmin')
const tokenMiddleware = require('../middleware/token')

/* GET home page. */
router.post('/add', checkAdmin, function(req, res, next) {
    const { username, password, identity } = req.body
    db.select('username').from('user').where('username', username).queryValue().then(data => {
        if ( data ) {
            res.send({code: 0, msg: '此员工已存在，重名员工请加上编号'})
        } else {
            db.insert('user').column('username', username).column('password', password).column('admin', identity).execute().then(() => {
                res.send({code: 200})
            }).catch(err => {
                console.log(err)
                res.send({code: 0, msg: '系统繁忙'})
            })
        }
    }).catch(err => {
        console.log(err)
        res.send({code: 0, msg: '系统繁忙'})
    })
});

// 获取员工列表
router.get('/list', tokenMiddleware, (req, res) => {
    const { page, username, admin } = req.query
    const page_size = 10
    if ( username && admin ) {
        db.select('*').from('user').where('username', username).where('admin', admin).queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: data.rows.filter(item => item.username != 'admin'),
                page: {
                    page: page || 1,
                    total: data.total,
                    page_size
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( username ) {
        db.select('*').from('user').where('username', username).queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: data.rows.filter(item => item.username != 'admin'),
                page: {
                    page: page || 1,
                    total: data.total,
                    page_size
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else if ( admin ) {
        db.select('*').from('user').where('admin', admin).queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: data.rows.filter(item => item.username != 'admin'),
                page: {
                    page: page || 1,
                    total: data.total,
                    page_size
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    } else {
        db.select('*').from('user').queryListWithPaging(page || 1, page_size).then(data => {
            res.send({
                code: 200,
                data: data.rows.filter(item => item.username != 'admin'),
                page: {
                    page: page || 1,
                    total: data.total,
                    page_size
                }
            })
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 删除员工
router.get('/delete', checkAdmin, (req, res) => {
    const { id } = req.query
    if ( !id ) {
        res.send({code: 0, msg: '缺少参数'})
    } else {
        db.delete('user').where('id', id).execute().then(() => {
            res.send({code: 200})
        }).catch(err => {
            console.log(err)
            res.send({code: 0, msg: '系统繁忙'})
        })
    }
})

// 修改员工
router.post('/edit', checkAdmin, (req, res) => {
    const { id, username, password, identity } = req.body
    if ( !id || !username || !password || !identity ) {
        res.send({code: 0, msg: '缺少参数'})
    } else {
        db.update('user')
        .where('id', id)
        .column('username', username)
        .column('password', password)
        .column('admin', identity)
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

module.exports = router;
