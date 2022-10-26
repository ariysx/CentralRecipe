const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Generate JSON Web Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRES}`
    })
}

// @desc Get current user
// @route GET /api/user/me
// @access Public
const getMe = asyncHandler (async (req, res) => {
    const { _id, username, name, email } = await User.findById(req.user._id)
    res.status(200).json({
        id: _id,
        username,
        name,
        email,
    })
})

// @desc Get a user
// @route GET /api/user/:id
// @access Public
const getUser = asyncHandler( async(req, res) => {
    const user = await User.find({username: req.params.id}).select("-password")
    res.status(200).json(user)
})

// @desc Register a user
// @route POST /api/user
// @access Public
const registerUser = asyncHandler (async (req, res) => {
    const {username, password, email, name} = req.body
    if(!username || !password || !email || !name) {
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create the user

    const user = await User.create({
        username,
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc Authenticate a user
// @route POST /api/user
// @access Public
const authenticateUser = asyncHandler (async (req, res) => {
    const {username, email, password} = req.body

    if(!username && !email){
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const user = await User.findOne({$or: [{email}, {username}]})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Update user
// @route PUT /api/user/
// @access Private
const updateUser = asyncHandler( async(req, res) => {

    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(req.body.favourites) {
        delete req.body.favourites
        res.status(401)
        throw new Error('Cannot have favourites')
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    res.status(200).json(updatedUser)
})

// @desc Delete user
// @route DELETE /api/user/:id
// @access Private
const deleteUser = asyncHandler( async (req, res) => {

    if(!req.user) {
        res.status(400)
        throw new Error('User not found')
    }

    await User.remove()

    res.status(200).json({
        message: `Delete user ${req.params.id}`
    })
})

// Export Modules
module.exports = {
    getMe,
    getUser,
    registerUser,
    authenticateUser,
    updateUser,
    deleteUser,
}