import { configureStore } from "@reduxjs/toolkit";
import authReducer from "store/reducers/authReducer";

export default configureStore({
	reducer: {
		user: authReducer,
	},
});
