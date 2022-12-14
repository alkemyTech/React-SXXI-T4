import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
const store = configureStore({
	reducer: {
		user: authSlice,
		devTools: true,
	},
});

export default store;
