import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlide, getAllSlides } from "Services/Slide/apiService";

const initialState = [];

export const obtainSlides = createAsyncThunk("obtainSlides", async () => {
	const data = await getAllSlides();
	return data;
});

export const create = createAsyncThunk("create", async body => {
	await createSlide(body);
});

const slidesSlice = createSlice({
	name: "slides",
	initialState,
});

export default slidesSlice.reducer;
