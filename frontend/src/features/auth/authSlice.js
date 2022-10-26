import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

// Pertain to the user part of the authentication
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try{
        return await authService.register(user);
    }catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    }catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // non async reducers functions
    reducers: {
        // reusable dispatch functions after an operation
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // async functions
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // payload returning from register function in the authService
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // from catch, e returns message error
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // payload returning from register function in the authService
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // from catch, e returns message error
                state.message = action.payload
            })
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// bring reset into components
export const {reset} = authSlice.actions
// export authSlice
export default authSlice.reducer