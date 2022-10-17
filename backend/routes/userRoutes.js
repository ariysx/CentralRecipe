// Import express
const express = require("express")
// Initialise Router
const router = express.Router()

// Login Module
const { getUser, setUser, updateUser, deleteUser } = require('../controllers/userController')

router.route('/').get(getUser).post(setUser)
router.route('/:id').put(updateUser).delete(deleteUser)

// Export userRoute
module.exports = router