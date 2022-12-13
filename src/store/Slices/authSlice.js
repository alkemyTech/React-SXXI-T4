/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "Services/Auth/AuthServices";
import { success } from "utils/alerts/alerts";

const auth = JSON.parse(localStorage.getItem("user"));
const initialState = auth ? { isLoggedIn: true, auth, token: "" } : { isLoggedIn: false, auth: null, token: "" };

export const signUp = createAsyncThunk("register", async (body, thunkAPI) => {
	const response = await signUpUser(body);
	success();
	return response.data;
});

export const signIn = createAsyncThunk("login", async (body, thunkAPI) => {
	const data = await signInUser(body);
	return data;
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		addToken: (state, action) => {
			state.token = localStorage.getItem("token");
		},
		addAuth: (state, action) => {
			state.auth = localStorage.getItem("user");
		},
		authLogout: (state, action) => {
			state.isLoggedIn = false;
			state.auth = "";
			state.token = null;
			localStorage.clear("token");
			localStorage.clear("user");
		},
	},

	extraReducers: builder => {
		builder.addCase(signIn.fulfilled, (state, { payload }) => {
			state.isLoggedIn = true;
			state.token = payload.data.token;
			state.auth = payload.data.user;
			localStorage.setItem("user", JSON.stringify(payload.data.user));
			localStorage.setItem("token", JSON.stringify(payload.data.token));
		});
		builder.addCase(signUp.fulfilled, (state, payload) => {
			state.isLoggedIn = false;
		});
	},
});

// Action creators are generated for each case reducer function
export const { addToken, addAuth, authLogout } = authSlice.actions;

export default authSlice.reducer;
