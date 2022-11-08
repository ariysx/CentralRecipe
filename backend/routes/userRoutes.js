// Import express
const express = require("express")
// Initialise Router
const router = express.Router()

// Login Module
const { registerUser, getUser, updateUser, deleteUser, authenticateUser, getMe, getStatistics,} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')
const { isFavourite, appendFavourite, removeFavourite} = require("../controllers/favouriteController");

router.post('/register', registerUser)
router.post('/login', authenticateUser)
router.get('/me', protect, getMe)
router.put('/', protect, updateUser)
router.delete('/', protect, deleteUser)

// router.get('/favourite', protect, getFavourites)
// TODO fix this broken route
router.get('/favourite/:id', protect, isFavourite)
router.put('/favourite/push', protect, appendFavourite)
router.put('/favourite/pull', protect, removeFavourite)
router.get('/:id/statistics', getStatistics)
router.get('/:id', getUser)
// Export userRoute
module.exports = router