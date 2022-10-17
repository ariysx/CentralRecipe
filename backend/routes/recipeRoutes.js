// Import express
const express = require("express")
// Initialise Router
const router = express.Router()

// Login Module
const { getRecipe, setRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')

router.route('/').get(getRecipe).post(setRecipe)
router.route('/:id').put(updateRecipe).delete(deleteRecipe)

// Export userRoute
module.exports = router