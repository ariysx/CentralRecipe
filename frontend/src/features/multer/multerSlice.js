import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import multerService from "./multerService";

const initialState = {
    data: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
// Upload a file
export const upload = createAsyncThunk('multer/upload', async (data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        console.log(data)
        return await multerService.upload(data,token);
    }catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get file
export const get = createAsyncThunk('multer/get', async(path, thunkAPI) => {
    try{
        return await multerService.get(path)
    }catch(e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const multerSlice = createSlice(
    {
        name: "multer",
        initialState,
        reducers: {
            reset: (state) => initialState
        },
        extraReducers: ((builder) => {
            builder
                .addCase(upload.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(upload.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.message = action.payload
                })
                .addCase(upload.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })

                .addCase(get.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(get.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.data = action.payload
                })
                .addCase(get.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        })
    }
)

export const { reset } = multerSlice.actions
export default multerSlice.reducer