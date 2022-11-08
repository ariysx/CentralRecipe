import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const initialState = {
    recipes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const createRecipe = createAsyncThunk('recipes/submit', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recipeService.createRecipe(data, token)
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateRecipe = createAsyncThunk('recipes/update', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recipeService.updateRecipe(data, token)
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getRecipes = createAsyncThunk('recipes/getAll', async (_, thunkAPI) => {
    try {
        return await recipeService.getRecipes();
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getRecipe = createAsyncThunk('recipes/get', async (id, thunkAPI) => {
    try {
        return await recipeService.getRecipe(id);
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getRecipeByUser = createAsyncThunk('recipes/get/user', async (id, thunkAPI) => {
    try {
        return await recipeService.getRecipeByUser(id);
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteRecipe = createAsyncThunk('recipe/delete', async (id, thunkAPI) => {
    try {
        return await recipeService.deleteRecipe(id, thunkAPI.getState().auth.user.token);
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const recipeSlice = createSlice(
    {
        name: "recipes",
        initialState,
        reducers: {
            reset: (state) => initialState
        },
        extraReducers: (builder) => {
            builder
                .addCase(getRecipes.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getRecipes.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = action.payload
                })
                .addCase(getRecipes.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.isSuccess = false
                    state.message = action.payload
                })
                .addCase(getRecipe.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getRecipe.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = action.payload
                })
                .addCase(getRecipe.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.isSuccess = false
                    state.message = action.payload
                })
                .addCase(getRecipeByUser.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getRecipeByUser.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = action.payload
                })
                .addCase(getRecipeByUser.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(deleteRecipe.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(deleteRecipe.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = state.recipes.filter((recipe) => recipe._id !== action.payload.id)
                })
                .addCase(deleteRecipe.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(createRecipe.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createRecipe.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = action.payload
                })
                .addCase(createRecipe.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(updateRecipe.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(updateRecipe.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.recipes = action.payload
                })
                .addCase(updateRecipe.rejected, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload
                })
        }
    }
)

export const {reset} = recipeSlice.actions
export default recipeSlice.reducer