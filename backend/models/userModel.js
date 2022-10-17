const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please provide an email']
        },
        name: {
            type: String,
            required: [true, 'Please provide a name']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)