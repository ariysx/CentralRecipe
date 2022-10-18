// Import express
const express = require("express")
// Initialise Router
const router = express.Router()

// Login Module
const { getRecipes, createRecipe, updateRecipe, deleteRecipe, getRecipeByUser, getRecipeByName} = require('../controllers/recipeController')
const {protect} = require("../middlewares/authMiddleware");

router.route('/').get(getRecipes).post(protect, createRecipe)
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe)
router.get('/user/:id', getRecipeByUser)
router.get('/name', getRecipeByName)

// Export userRoute
module.exports = router