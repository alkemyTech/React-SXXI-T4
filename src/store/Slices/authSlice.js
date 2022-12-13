/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "Services/Auth/AuthServices";
import { setMessage } from "store/Slices/messageSlice";
import { success } from "utils/alerts/alerts";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isLoggedIn: true, user, token: "" } : { isLoggedIn: false, user: null, token: "" };

export const signUp = createAsyncThunk("register", async (body, thunkAPI) => {
	try {
		const response = await signUpUser(body);
		thunkAPI.dispatch(setMessage(response.data.message));
		success();
		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		thunkAPI.dispatch(setMessage(message));
		return thunkAPI.rejectWithValue();
	}
});

export const signIn = createAsyncThunk("login", async (body, thunkAPI) => {
	try {
		const data = await signInUser(body);
		return data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		thunkAPI.dispatch(setMessage(message));
		return thunkAPI.rejectWithValue();
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addToken: (state, action) => {
			state.token = localStorage.getItem("token");
		},
		addUser: (state, action) => {
			state.user = localStorage.getItem("user");
		},
		userLogout: (state, action) => {
			state.isLoggedIn = false;
			state.user = "";
			state.token = null;
			localStorage.clear("token");
			localStorage.clear("user");
		},
	},

	extraReducers: builder => {
		builder.addCase(signIn.pending, (state, action) => {
			state.isLoggedIn = true;
		});

		builder.addCase(signIn.fulfilled, (state, { payload }) => {
			state.isLoggedIn = true;
			if (payload.error) {
				state.error = payload.error;
			} else {
				state.token = payload.data.token;
				state.user = payload.data.user;
				localStorage.setItem("user", JSON.stringify(payload.data.user));
				localStorage.setItem("token", JSON.stringify(payload.data.token));
			}
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.isLoggedIn = false;
			state.user = null;
		});

		builder.addCase(signUp.pending, (state, action) => {
			state.isLoggedIn = true;
		});
		builder.addCase(signUp.fulfilled, (state, payload) => {
			state.isLoggedIn = false;
		});

		builder.addCase(signUp.rejected, (state, action) => {
			state.isLoggedIn = false;
		});
	},
});

// Action creators are generated for each case reducer function
export const { addToken, addUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
