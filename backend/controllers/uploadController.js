const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const path = require('path')
const {upload} = require("../middlewares/multerMiddleware");

const uploadImage = asyncHandler( async (req, res) => {

    if(!req.file){
        res.status(401)
        throw new Error('Image not provided')
    }
    res.status(200).json(req.file.filename)
})

const getImage = asyncHandler(async (req, res) => {
    // res.sendFile(path.join(__dirname, `../upload/${req.params.name}`))
    res.sendFile(path.join(__dirname, `../upload/`))
})

module.exports = {
    uploadImage,
    getImage
}