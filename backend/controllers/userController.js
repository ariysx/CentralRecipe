// @desc Get users
// @route GET /api/user
// @access Private
const getUser = (req, res) => {
    res.status(200).json({
        message: "Get user"
    })
}

// @desc Set user
// @route SET /api/user
// @access Private
const setUser = (req, res) => {
    res.status(200).json({
        message: "Set user"
    })
}

// @desc Update user
// @route PUT /api/user/:id
// @access Private
const updateUser = (req, res) => {
    res.status(200).json({
        message: `Update user ${req.params.id}`
    })
}

// @desc Delete user
// @route DELETE /api/user/:id
// @access Private
const deleteUser = (req, res) => {
    res.status(200).json({
        message: `Delete user ${req.params.id}`
    })
}

// Export Modules
module.exports = {
    getUser,
    setUser,
    updateUser,
    deleteUser,
}