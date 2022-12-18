import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import userSlice from "store/Slices/userSlice"
const store = configureStore({
	reducer: {
		user: authSlice,
		users: userSlice,
		devTools: true,
	},
});

export default store;
