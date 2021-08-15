const multer = require("multer");
const path = require('path')

let storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './public/upload/goodsPic/')
    },
    filename (req, file, cb) {
        let exts = file.originalname.split('.')
        let ext = file.originalname.split('.')[exts.length - 1]

        const imgPath = ['/goodsPic']
        if ( imgPath.indexOf(req.path) != 1 && file.mimetype.indexOf('image') != -1 ) {
            const filename = `${ Date.parse(new Date()) / 1000 }.${ ext }`
            req.body.filename = filename
            cb(null, filename)
        }

    }
})

const upload = multer({
    storage
})

module.exports = upload