const asyncHandler = require('express-async-handler')
const Recipe = require('../models/recipeModel')
const User = require("../models/userModel")

const searchBar = asyncHandler(async(req,res)=>{
    if(req.body.recipe){
        const recipes = await Recipe.find({name: {$regex: new RegExp(req.body.recipe, "i")}}).limit(5)
        res.status(200).json(recipes)
    }

    if(req.body.user){
        const users = await User.find({$or : [{name: {$regex: new RegExp(req.body.user, "i")}}, {username: {$regex: new RegExp(req.body.user, "i")}}]}).limit(5)
        res.status(200).json(users)
    }

    res.status(400).json(
        {
            message: "Error, no body provided"
        }
    )
})

module.exports = {
    searchBar,
}