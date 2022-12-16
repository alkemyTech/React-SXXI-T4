import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	createSlide,
	deleteSlide,
	getAllSlides,
	getAmountOfSlides,
	getSlide,
	getSlides,
	updateSlide,
} from "Services/Slide/apiService";

const initialState = {
	list: [],
	amount: 0,
	isLoading: false,
};

export const obtainOne = createAsyncThunk("obtainOne", async id => {
	const data = await getSlide(id);
	return data;
});

export const obtainSlides = createAsyncThunk("obtainSlides", async () => {
	const data = await getAllSlides();
	return data;
});

export const obtainSearchSlides = createAsyncThunk("obtainSearchSlides", async search => {
	const data = await getSlides(search.search, search.amountToShow, search.page);
	return data;
});

export const obtainAmount = createAsyncThunk("obtainAmount", async search => {
	const data = await getAmountOfSlides(search);
	return data;
});

export const createOne = createAsyncThunk("create", async body => {
	await createSlide(body);
	return body;
});

export const updateOne = createAsyncThunk("update", async (id, body) => {
	await updateSlide(id, body);
	return body;
});

export const deleteOne = createAsyncThunk("delete", async id => {
	await deleteSlide(id);
	return id;
});

const slidesSlice = createSlice({
	name: "slids",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(obtainOne.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(obtainOne.fulfilled, (state, { payload }) => {
				const index = state.list.findIndex(slide => slide.id === payload.id);
				state.isLoading = false;
				return state[index];
			})
			.addCase(obtainSlides.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(obtainSlides.fulfilled, (state, { payload }) => {
				state.list = payload;
				state.isLoading = false;
			})
			.addCase(obtainSearchSlides.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(obtainSearchSlides.fulfilled, (state, { payload }) => {
				state.list = payload;
				state.isLoading = false;
			})
			.addCase(obtainAmount.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(obtainAmount.fulfilled, (state, { payload }) => {
				state.amount = payload;
				state.isLoading = false;
			})
			.addCase(createOne.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(createOne.fulfilled, (state, { payload }) => {
				state.list.push(payload);
				state.isLoading = false;
			})
			.addCase(updateOne.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(updateOne.fulfilled, (state, { payload }) => {
				const index = state.findIndex(slide => slide.id === payload.id);
				state.list[index] = { ...state.list[index], ...payload };
				state.isLoading = false;
			})
			.addCase(deleteOne.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(deleteOne.fulfilled, (state, { payload }) => {
				const index = state.findIndex(slide => slide.id === payload);
				state.splice(index, 1);
				state.isLoading = false;
			});
	},
});
obtainSlides();

export default slidesSlice.reducer;
