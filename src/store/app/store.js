import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import slidesSlice from "store/Slices/slidesSlice";
const store = configureStore({
	reducer: {
		user: authSlice,
		slides: slidesSlice,
		devTools: true,
	},
});

export default store;
