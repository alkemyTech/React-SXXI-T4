import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
const store = configureStore({
	reducer: {
		auth: authSlice,
		devTools: true,
	},
});

export default store;
