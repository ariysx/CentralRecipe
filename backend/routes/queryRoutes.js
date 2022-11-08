// Import express
const express = require("express")
const {searchBar} = require("../controllers/queryController");
// Initialise Router
const router = express.Router()


router.post('/', searchBar)

// Export userRoute
module.exports = router