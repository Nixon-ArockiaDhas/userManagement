import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUsers, deleteUsers, fetchUsers, updateUsers } from "../api/api";

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
    let allUsers = [];
    let page = 1;
    let totalPages = 1;

    do {
        const response = await fetchUsers(page);
        allUsers = [...allUsers, ...response.data];
        totalPages = response.total_pages;
        page++;
    } while (page <= totalPages);

    return allUsers;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
    const data = await createUsers(user);
    return data
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
    const data = await updateUsers(id, user);
    return { id, ...data };
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await deleteUsers(id);
    return id;
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
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...action.payload };
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });

    }
})

export default userSlice.reducer;