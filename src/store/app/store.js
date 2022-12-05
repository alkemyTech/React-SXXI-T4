import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/reducers/authSlice";

const store = configureStore({
	reducer: {
		user: authSlice,
	},
});

export default store;
