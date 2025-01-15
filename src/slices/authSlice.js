import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { login } from "../api/api";

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    try {
        return await login(email, password);
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.error || 'Login failed');
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user || { email: action.meta.arg.email };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;