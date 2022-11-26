![](https://i.imgur.com/PjEgW16.png)
# Central Recipe
Central Recipe is a MERN stack application for users to share their favourites recipe around

### Features
- Register: create, read, update or delete a profile with personal information, including a profile picture and password management (change)
- Authentication: Log in and log out
- Search: for recipes and users that match certain criteria (e.g. name, time to cook, category, keywords, max/min of cooking time, etc.)
- View: View search results
- Filter: The search results
- Add recipe to a personal area (e.g. “My Favourites”)
- Only logged in users can add recipes to the personal area
- Any user can search for recipes or users and see the results
- Submit recipe, view, edit, delete, and share

### Installation
1. Remove package-lock.json
2. Install packages with `npm i` in `/` and `/frontend`
3. Start frontend and backend with `npm run dev`
4. .env file is required at `/`

#### .ENV
```
NODE_ENV = development
PORT = 8000 // Backend Port
MONGO = MongoURL // Including the collection url
JWT_SECRET = ABC123
JWT_EXPIRES = 1d
```

#### Sample Data for MongoDB
- Import from `recipes.json` and `users.json`


### Technologies
- MERN Stack (MongoDB, Express, React, Node.js)
#### Frontend
- @reduxjs/toolkit
- @splidejs/react-splide
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- axios
- bootstrap
- canvas-confetti
- formik
- moment
- qs
- react
- react-bootstrap
- react-dom
- react-icons
- react-input-slider
- react-redux
- react-router-dom
- react-scripts:5.0.1,
- react-toastify
- web-vitals
- yup

#### Backend
- bcryptjs
- colors
- dotenv
- express
- express-async-handler
- fs-extra
- jsonwebtoken
- mongoose
- multer

#### Dev Dependencies
- nodemon
- concurrently

#### Credits
- [Icons8](https://icons8.com/) - icons and other assets

