import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import activitySlice from "store/Slices/activitiesSlice";
import membersSlice from "store/Slices/membersSlice";
import categoriesSlice from "store/Slices/categoriesSlice";
import slidesSlice from "store/Slices/slidesSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		categories: categoriesSlice,
		activity: activitySlice,
		members: membersSlice,
		slides: slidesSlice,
		devTools: true,
	},
});
export default store;
