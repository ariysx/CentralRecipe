const asyncHandler = require('express-async-handler')
const Recipe = require('../models/recipeModel')
const User = require("../models/userModel")

const searchBar = asyncHandler(async (req, res) => {
    if (req.body.recipe) {
        const recipes = await Recipe.find({name: {$regex: new RegExp(req.body.recipe, "i")}}).limit(5)
        res.status(200).json(recipes)
    }

    if (req.body.user) {
        const users = await User.find({$or: [{name: {$regex: new RegExp(req.body.user, "i")}}, {username: {$regex: new RegExp(req.body.user, "i")}}]}).limit(5)
        res.status(200).json(users)
    }

    res.status(400).json(
        {
            message: "Error, no body provided"
        }
    )
})

const search = asyncHandler(async (req, res) => {

    // console.log(req.body)
    // category, servings, time, keywords
    let time = 0
    if (req.body.timeHour) {
        time += parseInt(req.body.timeHour * 60)
    }

    if (req.body.timeMin) {
        time += parseInt(req.body.timeMin)
    }

    // console.log(time)

    if (req.body.searchBy === "recipe") {
        // const recipes = await Recipe.find({$or: [
        //     {category: (req.body.category ? {$in: req.body.category} : {$exists: true})},
        //     {servings: (req.body.servings ? req.body.servings : {$exists: true})},
        //     {totalTime: (time ? time : {$exists: true})},
        //     {keywords: (req.body.keywords ? req.body.keywords : {$exists: true})}
        // ]})
        let query = {}
        if(req.body.name && req.body.name.length > 0) query['name'] = {$regex: new RegExp(req.body.name, "i")}
        if(req.body.category) query['category'] = {$in: req.body.category.split(",")}
        if(req.body.servings && parseInt(req.body.servings) !== 0) query['servings'] = parseInt(req.body.servings)
        if(req.body.timeHour && req.body.timeMin && time !== 0) query['totalDuration'] = {$gte: time}
        if(req.body.keywords) query['keywords'] = req.body.keywords


        const recipes = await Recipe.find(query)
        // console.log(query)
        console.log(recipes.length)
        res.status(200).json(recipes)
    }

    if (req.body.searchBy === "user") {

        res.status(200).json({
            message: "Hit User"
        })
    }
})

module.exports = {
    searchBar,
    search,
}