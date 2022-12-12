import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import newsSlice from "store/Slices/newsSlice";

const store = configureStore({
	reducer: {
		user: authSlice,
		news: newsSlice,
		devTools: true,
	},
});

export default store;
