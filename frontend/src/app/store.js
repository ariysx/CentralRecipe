import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import recipeReducer from '../features/recipe/recipeSlice'
import favouriteReducer from '../features/favourite/favouriteSlice'
import multerReducer from '../features/multer/multerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
    favourite: favouriteReducer,
    multer: multerReducer,
  },
});
