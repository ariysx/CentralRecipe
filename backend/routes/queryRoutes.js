// Import express
const express = require("express")
const {search, searchBar} = require("../controllers/queryController");
// Initialise Router
const router = express.Router()


router.post('/', searchBar)
router.post('/search', search)

// Export userRoute
module.exports = router