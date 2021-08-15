// 图片上传
var express = require('express');
var router = express.Router();

const upload = require('../middleware/upload')

// 上传商品图片
router.post('/goodsPic', upload.single('file'), function(req, res, next) {
    if ( req.body.filename ) {
        res.send({code: 200, data: req.body.filename});
    } else {
        res.send({code: 0, msg: '文件不符合规则'})
    }
});

module.exports = router;