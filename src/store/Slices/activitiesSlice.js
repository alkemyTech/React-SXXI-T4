/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActivities, deleteActivity } from "Services/Activity/ApiService";

const initialState = {
	activity: "",
};
export const activityList = createAsyncThunk("activityList", async ({ search, amountToShow, page }) => {
	const data = await getActivities(search, amountToShow, page);
	return data;
});

export const activityDelete = createAsyncThunk("activityDelete", async body => {
	const data = await deleteActivity(body);
	return data;
});

const activitySlice = createSlice({
	name: "acitvity",
	initialState,

	extraReducers: builder => {
		builder.addCase(activityList.fulfilled, (state, { payload }) => {
			state.activity = payload;
		});
		builder.addCase(activityDelete.fulfilled, (state, { payload }) => {
			state.activity = payload;
		});
	},
});

// Action creators are generated for each case reducer function

export default activitySlice.reducer;
