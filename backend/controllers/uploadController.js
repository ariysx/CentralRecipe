const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const path = require('path')

const uploadImage = asyncHandler( async (req, res) => {
    res.status(200).json(req.file)
})

const getImage = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, `../upload/${req.params.name}`))
})

module.exports = {
    uploadImage,
    getImage
}