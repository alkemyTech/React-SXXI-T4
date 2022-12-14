import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import activitySlice from "store/Slices/activitiesSlice";
const store = configureStore({
	reducer: {
		auth: authSlice,
		activity: activitySlice,
		devTools: true,
	},
});

export default store;
