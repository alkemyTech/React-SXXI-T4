import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import messageSlice from "store/Slices/messageSlice";
import membersSlice from "store/Slices/membersSlice";

const store = configureStore({
	reducer: {
		user: authSlice,
		members: membersSlice,
		message: messageSlice,
		devTools: true,
	},
});

export default store;
