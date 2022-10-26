const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const path = require('path')

const uploadImage = asyncHandler( async (req, res) => {
    console.log(req)
    res.status(200).json({message: "Success"})
})

const getImage = asyncHandler(async (req, res) => {
    // res.sendFile(path.join(__dirname, `../upload/${req.params.name}`))
    res.sendFile(path.join(__dirname, `../upload/`))
})

module.exports = {
    uploadImage,
    getImage
}