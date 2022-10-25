const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            index: {
                unique: true,
                dropDups: true
            },
            required: [true, 'Please provide a username']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        email: {
            type: String,
            index: {
                unique: true,
                dropDups: true
            },
            required: [true, 'Please provide an email']
        },
        name: {
            type: String,
            required: [true, 'Please provide a name']
        },
        favourites: {
            type: [String],
            ref: 'Recipe'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)