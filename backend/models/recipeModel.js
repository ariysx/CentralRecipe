const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a title'],
            unique: true,
        },
        image: {
            type: String,
            required: [true, 'Please provide an image']
        },
        description: {
            type: String,
            required: [true, 'Please provide a description']
        },
        category: {
            type: [String],
            required: [true, 'Please provide a category']
        },
        keywords: {
            type: {},
            required: [true, 'Please provide a keyword']
        },
        // TODO fix this duration thing to match restrictions
        duration: {
            type: [],
            required: [true, 'Please provide a time']
        },
        // TODO fix this thing to match restrictions
        ingredients: {
            type: [],
            required: [true, 'Please provide an ingredient']
        },
        // TODO fix this thing to match restrictions
        instructions: {
            type: [],
            required: [true, 'Please provide an instruction']
        },
        notes: {
          type: String,
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