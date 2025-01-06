import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
    const baseUrl = 'https://reqres.in/api/users';
    let allUsers = [];
    let page = 1;
    let totalPages = 1;

    do {
        const response = await axios.get(`${baseUrl}?page=${page}`);
        allUsers = [...allUsers, ...response.data.data];
        totalPages = response.data.total_pages;
        page++;
    } while (page <= totalPages);

    return allUsers;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default userSlice.reducer;