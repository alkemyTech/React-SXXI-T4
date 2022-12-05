/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "Services/Auth/AuthServices";
const initialState = {
	user: "",
	token: "",
	loading: false,
	error: "",
};

export const signUp = createAsyncThunk("register", async body => {
	const res = await signUpUser(JSON.stringify(body));
	return await res.json();
});

export const signIn = createAsyncThunk("login", async body => {
	const res = await signInUser(JSON.stringify(body));
	return await res.json();
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
		logout: (state, action) => {
			state.token = null;
			localStorage.clear("token");
		},
	},

	extraReducers: builder => {
		builder.addCase(signIn.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(signIn.fulfilled, (state, { payload: { error, msg, token, user } }) => {
			state.loading = false;
			if (error) {
				state.error = error;
			} else {
				state.token = token;
				state.user = user;
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", token);
			}
		});

		builder.addCase(signUp.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(signUp.fulfilled, (state, { payload: { error, msg, token, user } }) => {
			state.loading = false;
			if (error) {
				state.error = error;
			} else {
				state.msg = msg;
			}
		});

		builder.addCase(signUp.rejected, (state, action) => {
			state.loading = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const { addToken, addUser, logout } = userSlice.actions;

export default userSlice.reducer;
