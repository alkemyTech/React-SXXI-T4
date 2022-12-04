/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	password: "",
	token: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		registerUser: (state, action) => {
			state.email = action.payload.email;
			state.password = action.payload.password;
		},
		loginUser: (state, action) => {
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.token = action.payload.token;
		},

		unsetUser: state => {
			state.email = "";
			state.password = "";
			state.token = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { registerUser, loginUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
