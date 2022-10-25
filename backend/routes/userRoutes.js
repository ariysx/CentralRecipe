// Import express
const express = require("express")
// Initialise Router
const router = express.Router()

// Login Module
const { registerUser, getUser, updateUser, deleteUser, authenticateUser, getMe, appendFavourite, removeFavourite,
    getFavourites, isFavourite
} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.get('/find/:id', getUser)
router.post('/login', authenticateUser)
router.get('/me', protect, getMe)
router.put('/', protect, updateUser)
router.delete('/', protect, deleteUser)
router.get('/favourite', protect, getFavourites)
router.get('/favourite/:id', protect, isFavourite)
router.put('/favourite/push', protect, appendFavourite)
router.put('/favourite/pull', protect, removeFavourite)

// Export userRoute
module.exports = router