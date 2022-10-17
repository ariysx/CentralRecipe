// Importing async handler from express sync handler
const asyncHandler = require('express-async-handler')

// Importing mongoose model
const Recipe = require('../models/recipeModel')

// @desc Get Recipes
// @route GET /api/recipe
// @access Private
const getRecipe = asyncHandler(async (req, res) => {
    const Recipes = await Recipe.find()
    res.status(200).json(Recipes)
})

// @desc Set Recipe
// @route SET /api/recipe
// @access Private
const setRecipe = asyncHandler(async (req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Please provide a text')
    }

    const createRecipe = await Recipe.create(req.body)

    res.status(200).json({
        message: `Set Recipe`
    })
})

// @desc Update Recipe
// @route PUT /api/recipe/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
    const Recipe = Recipe.findById(req.params.id)

    if(!Recipe) {
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

    const Recipe = Recipe.findById(req.params.id)

    if(!Recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    await Recipe.remove()

    res.status(200).json({
        message: `Delete Recipe ${req.params.id}`
    })
})

// Export Modules
module.exports = {
    getRecipe,
    setRecipe,
    updateRecipe,
    deleteRecipe,
}