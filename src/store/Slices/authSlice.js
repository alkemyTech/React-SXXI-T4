/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "Services/Auth/AuthServices";
import { success, error } from "utils/alerts/alerts";

const auth = JSON.parse(localStorage.getItem("user"));
const initialState = auth ? { isLoggedIn: true, user: auth, token: "" } : { isLoggedIn: false, user: null, token: "" };

export const signUp = createAsyncThunk("register", async (body, thunkAPI) => {
	try {
		const response = await signUpUser(body);
		success();
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

export const signIn = createAsyncThunk("login", async (body, thunkAPI) => {
	try {
		const data = await signInUser(body);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue();
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		addToken: (state, action) => {
			state.token = localStorage.getItem("token");
		},
		addAuth: (state, { payload }) => {
			state.user = payload;
			localStorage.setItem("user", JSON.stringify(payload));
			state.isLoggedIn = true;
			state.error=null;
		},
		authLogout: (state, action) => {
			state.isLoggedIn = false;
			state.user = "";
			state.token = null;
			localStorage.clear("token");
			localStorage.clear("user");
		},
	},

	extraReducers: builder => {
		builder.addCase(signIn.fulfilled, (state, { payload }) => {
			state.isLoggedIn = true;
			if (payload.error) {
				state.error = payload.error;
				state.user = {};
				state.token = "";
				state.isLoggedIn = false;
				error("Usuario o contraseña incorrecta");
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
	},
});

// Action creators are generated for each case reducer function
export const { addToken, addAuth, authLogout } = authSlice.actions;

export default authSlice.reducer;
