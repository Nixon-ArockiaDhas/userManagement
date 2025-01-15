import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import { thunk } from "redux-thunk";
import snackbarReducer from './slices/snackbarSlice';
import authReducer from './slices/authSlice';


const store = configureStore({
    reducer: {
        users: userReducer,
        snackbar: snackbarReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
})

export default store;