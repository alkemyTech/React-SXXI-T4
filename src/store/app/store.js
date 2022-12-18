import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import membersSlice from "store/Slices/membersSlice";

const store = configureStore({
	reducer: {
		user: authSlice,
		members: membersSlice,
		devTools: true,
	},
});

export default store;
