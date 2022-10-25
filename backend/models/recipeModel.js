const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a title']
        },
        body: {
            type: String,
            required: [true, 'Please provide a body']
        },
        ingredients: {
            type: [String],
            required: [true, 'Please provide an ingredient']
        },
        instructions: {
            type: [String],
            required: [true, 'Please provide an instruction']
        },
        duration: {
            type: Number,
            required: [true, 'Please provide an estimated cooking time']
        },
        images: {
            type: [String],
            required: [true, 'Please provide an image']
        },
        thumbnail: {
            type: String,
            default: function(){
                return this.images[0].toString()
            }
        },
        tags: {
            type: [String]
        },
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please provide a publisher'],
            ref: 'User'
        },
        likes: {
            type: Number,
            required: false,
            default: 0
        }
    }, {
        timestamps: true,
    }
)

module.exports = mongoose.model('Recipe', recipeSchema)