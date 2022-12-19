/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActivities, deleteActivity, createActivity } from "Services/Activity/ApiService";

const initialState = {
	activity: [],
};
export const activityList = createAsyncThunk("activityList", async ({ search, amountToShow, page }) => {
	const data = await getActivities(search, amountToShow, page);
	return data;
});

export const activityDelete = createAsyncThunk("Delete", async body => {
	const res = await deleteActivity(body);
	return res;
});

export const activityCreate = createAsyncThunk("Create", async body => {
	const res = await createActivity(body);
	return res;
});

const activitySlice = createSlice({
	name: "acitvity",
	initialState,
	extraReducers: builder => {
		builder.addCase(activityList.fulfilled, (state, { payload }) => {
			state.activity = payload;
		});
		builder.addCase(activityDelete.fulfilled, (state, { payload }) => {
			state.activity = state.activity.filter(act => act.id !== payload.id);
		});
		builder.addCase(activityCreate.fulfilled, (state, { payload }) => {
			state.activity = state.activity.push(payload.data);
		});
	},
});

// Action creators are generated for each case reducer function
export default activitySlice.reducer;
