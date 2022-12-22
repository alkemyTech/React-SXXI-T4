import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import activitySlice from "store/Slices/activitiesSlice";
import membersSlice from "store/Slices/membersSlice";
import categoriesSlice from "store/Slices/categoriesSlice";
import slidesSlice from "store/Slices/slidesSlice";
import userSlice from "store/Slices/userSlice";
import newsSlice from "store/Slices/newsSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		categories: categoriesSlice,
		activity: activitySlice,
		members: membersSlice,
		users: userSlice,
		news: newsSlice,
		slides: slidesSlice,
		devTools: true,
	},
});
export default store;
