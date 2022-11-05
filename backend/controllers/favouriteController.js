const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// @desc Update to fav list
// @route PUT /api/user/favourite/push
// @access Private
const appendFavourite = asyncHandler( async(req, res) => {
    // const user = await User.findById(req.user._id)
    const newFav = await User.findByIdAndUpdate(req.user._id, {$addToSet: {"favourites": req.body.favourites}}, {new: true}).select("favourites -_id")
    const newRecipe = await Recipe.findByIdAndUpdate(req.body.favourites, {$inc: {"likes": 1}}, {new: true})
    res.status(200).json(newFav)
})

// @desc Remove from fav list
// @route PUT /api/user/favourite/pull
// @access Private
const removeFavourite = asyncHandler( async(req, res) => {
    const newFav = await User.findByIdAndUpdate(req.user._id, {$pull: {"favourites": req.body.favourites}},{new: true}).select("favourites -_id")
    const newRecipe = await Recipe.findByIdAndUpdate(req.body.favourites, {$inc: {"likes": -1}}, {new: true})
    res.status(200).json(newFav)
})


// @desc Get all fav
// @route PUT /api/user/favourite/
// @access Private
const getFavourites = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // console.log(mongoose.Types.ObjectId.isValid(req.user._id))


    const favourites = await User.findById(req.user._id, {_id: 0, favourites: 1})
    res.status(200).json(favourites)
})


// @desc is it favourite? from fav list
// @route PUT /api/user/favourite/:id
// @access Private
const isFavourite = asyncHandler( async (req, res) => {
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const favourites = await User.findById(req.user._id, {_id: 0, favourites: 1})
    res.status(200).json(favourites)
    // console.log(favourites)
    // if(!favourites.length) {
    //     res.status(200).json({
    //         result: false
    //     })
    // } else {
    //     res.status(200).json({
    //         result: true
    //     })
    // }
})

// Export Modules
module.exports = {
    isFavourite,
    getFavourites,
    removeFavourite,
    appendFavourite,
}