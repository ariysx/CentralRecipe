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
            type: String,
            required: [true, 'Please provide an instruction']
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
//
// recipeSchema.pre('save', function(next){
//     this.thumbnail = this.image[0]
//     next()
// })

module.exports = mongoose.model('Recipe', recipeSchema)