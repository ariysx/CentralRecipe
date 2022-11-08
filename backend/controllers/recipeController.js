// Importing async handler from express sync handler
const asyncHandler = require('express-async-handler')

// Importing mongoose model
const Recipe = require('../models/recipeModel')
const User = require("../models/userModel")

// @desc Get Recipes
// @route GET /api/recipe
// @access Public
const getRecipes = asyncHandler(async (req, res) => {
    const recipe = await Recipe.find()
    res.status(200).json(recipe)
})

// @desc Get Recipes by user
// @route GET /api/recipe/user/:id
// @access Public
const getRecipeByUser = asyncHandler(async (req, res) => {
    const recipe = await Recipe.find({publisher: req.params.id})
    res.status(200).json(recipe)
})

// @desc Get Recipe by name
// @route GET /api/recipe/name
// @access Public
const getRecipeByName = asyncHandler( async (req, res) => {
    const recipe = await Recipe.find({name: {$regex: req.params.name}})
    res.status(200).json(recipe)
})

const getRecipe = asyncHandler( async ( req , res ) => {
    const recipe = await Recipe.find({_id: req.params.id})
    res.status(200).json(recipe)
})

// @desc Create Recipe
// @route POST /api/recipe
// @access Private
const createRecipe = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    const {name, image, description, category, keywords, duration, ingredients, instructions, notes, servings } = req.body
    const check = await Recipe.findOne({name: req.body.name})
    if(check) {
        res.status(401)
        throw new Error('Recipe with this name already exists')
    }
    // if(!name || !body || !ingredients || !instructions || !images ){
    //     res.status(400)
    //     throw new Error('Please provide all fields')
    // }

    const recipe = await Recipe.create({
        name,
        image,
        description,
        category,
        keywords,
        duration,
        ingredients,
        instructions,
        notes,
        servings,
        publisher: user
    })

    res.status(200).json(recipe)
})

// @desc Update Recipe
// @route PUT /api/recipe/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    const recipe = await Recipe.findById(req.params.id)

    if(!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    // Make sure user is owner
    if(recipe.publisher.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized')
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedRecipe)
})

// @desc Delete recipe
// @route DELETE /api/recipe/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    const recipe = await Recipe.findById(req.params.id)

    if(!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    // Make sure user is owner
    if(recipe.publisher.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized')
    }

    await Recipe.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })

})

// Export Modules
module.exports = {
    getRecipes,
    getRecipeByUser,
    getRecipeByName,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
}