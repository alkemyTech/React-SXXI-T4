/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, deleteCategory, createCategory } from "Services/Category/ApiService";

const initialState = {
	category: "",
};
export const categoryList = createAsyncThunk("categoryList", async ({ search, amountToShow, page }) => {
	const data = await getCategories(search, amountToShow, page);
	return data;
});

export const categoryDelete = createAsyncThunk("Delete", async body => {
	await deleteCategory(body);
});

export const categoryCreate = createAsyncThunk("Create", async body => {
	await createCategory(body);
});

const categorySlice = createSlice({
	name: "category",
	initialState,
	extraReducers: builder => {
		builder.addCase(categoryList.fulfilled, (state, { payload }) => {
			state.category = payload;
		});
	},
});

// Action creators are generated for each case reducer function
export default categorySlice.reducer;
