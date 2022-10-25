const express = require("express")
// Initialise Router
const router = express.Router()

const {protect} = require('../middlewares/authMiddleware')
const {upload} = require("../middlewares/multerMiddleware");
const {uploadImage, getImage} = require("../controllers/uploadController");

router.post('/', protect, upload.single('image'), uploadImage)
router.get('/:name', getImage)

module.exports = router