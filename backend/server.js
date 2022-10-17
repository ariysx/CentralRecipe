// Import node modules
const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middlewares/errorMiddleware")
const colors = require("colors")

// Establish Mongo DB connection through mongoose
const { connectDB } = require("./configs/db")
connectDB()

// Pulling port from dotENV on 'PORT'
const port = process.env.PORT

// Initialise Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Create default routes
// app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/recipe', require('./routes/recipeRoutes'))

// Override express default handler
// custom error handling must be at the end of application stack
app.use(errorHandler)

// Set port listener
app.listen(port, () => console.log(`Server Started On Port ${port}`))


