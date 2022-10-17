// Importing async handler from express sync handler
const asyncHandler = require('express-async-handler')

// Importing mongoose model
const Recipe = require('../models/recipeModel')
const User = require("../models/userModel");

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
// @route GET /api/recipe/name/:id
// @access Public
const getRecipeByName = asyncHandler( async (req, res) => {
    const recipe = await Recipe.find({name: req.params.name})
    res.status(200).json(recipe)
})

// @desc Create Recipe
// @route POST /api/recipe
// @access Private
const createRecipe = asyncHandler(async (req, res) => {

    const { _id } = await User.findById(req.user.id)

    const {name, body, ingredients, instructions, images } = req.body
    const publisher = _id

    if(!name || !body || !ingredients || !instructions || !images ){
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const recipe = await Recipe.create({
        name,
        body,
        ingredients,
        instructions,
        images,
        publisher
    })

    res.status(200).json(recipe)
})

// @desc Update Recipe
// @route PUT /api/recipe/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = Recipe.findById(req.params.id)

    if(!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedRecipe)
})

// @desc Delete recipe
// @route DELETE /api/recipe/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {

    // TODO Fix Delete not working, broken logic - ID not exist but returned success???
    const { _id } = await User.findById(req.user.id)
    const publisher = _id
    const recipe = Recipe.find({id: req.params.id, publisher: _id})
    // const recipe = Recipe.findById(req.params.id)

    if(!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    await Recipe.findByIdAndDelete(req.params.id)

    res.status(200).json({
        publisher: `${publisher}`,
        message: `Delete Recipe ${req.params.id}`,
    })
})

// Export Modules
module.exports = {
    getRecipes,
    getRecipeByUser,
    getRecipeByName,
    createRecipe,
    updateRecipe,
    deleteRecipe,
}