import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import favouriteService from './favouriteService'

const initialState = {
    favourites: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getFavourites = createAsyncThunk('favourite/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await favouriteService.getFavourites(token);
    } catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const pullFavourite = createAsyncThunk('favourite/pull', async (recipeId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await favouriteService.pullFavourite(recipeId,token);
    } catch(e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const pushFavourite = createAsyncThunk('favourite/push', async (recipeId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await favouriteService.pushFavourite(recipeId,token);
    } catch(e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const favouriteSlice = createSlice(
    {
        name: "favourites",
        initialState,
        reducers: {
            reset: (state) => {
                    state.favourites = []
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = false
                    state.message = ''
                }
            },
        extraReducers: (builder) => {
            builder
                .addCase(getFavourites.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getFavourites.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.favourites = action.payload
                })
                .addCase(getFavourites.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(pushFavourite.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(pushFavourite.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.favourites = action.payload
                })
                .addCase(pushFavourite.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(pullFavourite.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(pullFavourite.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.favourites = action.payload
                })
                .addCase(pullFavourite.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        }
    }
)

export const { reset } = favouriteSlice.actions
export default favouriteSlice.reducer