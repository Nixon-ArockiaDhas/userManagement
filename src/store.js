import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import snackbarReducer from './slices/snackbarSlice'


const store = configureStore({
    reducer: {
        users: userReducer,
        snackbar: snackbarReducer,
    }
})

export default store;