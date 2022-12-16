import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlide, deleteSlide, getAllSlides, getSlide, getSlides, updateSlide } from "Services/Slide/apiService";

const initialState = {
	list: [],
	amount: 0,
};

export const obtainOne = createAsyncThunk("obtainOne", async id => {
	const data = await getSlide(id);
	return data;
});

export const obtainSlides = createAsyncThunk("obtainSlides", async () => {
	const data = await getAllSlides();
	return data;
});

export const obtainSearchSlides = createAsyncThunk("obtainSearchSlides", async (search, amount, page) => {
	const data = await getSlides(search, amount, page);
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
			.addCase(obtainOne.fulfilled, (state, { payload }) => {
				const index = state.list.findIndex(slide => slide.id === payload.id);
				return state[index];
			})
			.addCase(obtainSlides.fulfilled, (state, { payload }) => {
				state.list = payload;
				state.amount = payload.length;
			})
			.addCase(obtainSearchSlides.fulfilled, (state, { payload }) => {
				state.list = payload;
				state.amount = payload.length;
			})
			.addCase(createOne.fulfilled, (state, { payload }) => {
				state.list.push(payload);
			})
			.addCase(updateOne.fulfilled, (state, { payload }) => {
				const index = state.findIndex(slide => slide.id === payload.id);
				state.list[index] = { ...state.list[index], ...payload };
			})
			.addCase(deleteOne.fulfilled, (state, { payload }) => {
				const index = state.findIndex(slide => slide.id === payload);
				state.splice(index, 1);
			});
	},
});
obtainSlides();

export default slidesSlice.reducer;
