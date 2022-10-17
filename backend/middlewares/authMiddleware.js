const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    let token

    // Bearer token :: make sure the data includes token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            // ["Bearer {token}"]

            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token ( User data is in payload )
            // Payload data in the token therefore we can fetch it's ID
            req.user = await User.findById(decoded.id).select("-password") // Dont include password

            // Then next
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Unauthorized, no token provided')
    }
})

module.exports = {
    protect
}