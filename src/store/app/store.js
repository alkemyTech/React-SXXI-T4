import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import categoriesSlice from "store/Slices/categoriesSlice";
const store = configureStore({
	reducer: {
		user: authSlice,
		categories: categoriesSlice,
		devTools: true,
	},
});

export default store;
