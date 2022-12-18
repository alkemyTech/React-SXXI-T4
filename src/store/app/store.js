import { configureStore } from "@reduxjs/toolkit";
import authSlice from "store/Slices/authSlice";
import activitySlice from "store/Slices/activitiesSlice";
import membersSlice from "store/Slices/membersSlice";
import categoriesSlice from "store/Slices/categoriesSlice";


const store = configureStore({
	reducer: {
		auth: authSlice,
		categories: categoriesSlice,
		activity: activitySlice,
		members: membersSlice,
    devTools: true,
    }
})
export default store;
