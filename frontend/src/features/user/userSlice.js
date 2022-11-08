import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: [],
    statistics: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

export const getUserById = createAsyncThunk('user/get', async (id, thunkAPI) => {
    try {
        return await userService.getUserById(id);
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getStatistics = createAsyncThunk('user/get/statistics', async (id, thunkAPI) => {
    try {
        return await userService.getStatistics(id);
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice(
    {
        name: "users",
        initialState,
        reducers: {
            reset: (state) => initialState
        },
        extraReducers: (builder => {
            builder
                .addCase(getUserById.fulfilled, (state, action) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.isError = false
                    state.users = action.payload
                })
                .addCase(getStatistics.fulfilled, (state, action) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.isError = false
                    state.statistics = action.payload
                })
        })
    }
)

export const {reset} = userSlice.actions
export default userSlice.reducer