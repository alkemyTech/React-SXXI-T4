import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import messageSlice from "store/Slices/messageSlice";
const store = configureStore({
	reducer: {
		user: authSlice,
		message: messageSlice,
		devTools: true,
	},
});

export default store;
