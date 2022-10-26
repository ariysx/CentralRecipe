const multer = require('multer')
const path = require('path')
const fs = require("fs-extra");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = 'backend/upload/'
        fs.mkdirsSync(path);
        cb(null, path)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, (Date.now() + path.extname(file.originalname)))
    }
})

const upload = multer({storage: storage})

module.exports = {
    upload
}