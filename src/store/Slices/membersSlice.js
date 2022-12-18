import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	findAllByPageAndSearch,
	findAllAndSearch,
	findById,
	create,
	update,
	deleteById,
	amountOfMembers,
} from "Services/Member/MemberApiService";

const initialState = {
	list: [],
	amount: 0,
	isLoading: false,
	edit: {},
};

export const getMembersByPageAndSearch = createAsyncThunk("members/fetchByPageAndSearch", async body => {
	const response = await findAllByPageAndSearch(body.page, body.amountOfMembers, body.search);
	return response;
});

export const getdMembersBySearch = createAsyncThunk("members/fetchAllBySearch", async search => {
	const response = await findAllAndSearch(search);
	return response;
});
export const getMemberById = createAsyncThunk("members/fetchById", async id => {
	const response = await findById(id);
	return response;
});
export const getAmountOfMembers = createAsyncThunk("members/getAmountOfMembers", async search => {
	const response = await amountOfMembers(search);
	return response;
});
export const createMember = createAsyncThunk("members/create", async body => {
	const response = await create(body);
	return response;
});
export const editMember = createAsyncThunk("members/edit", async body => {
	const response = await update(body.id, body.values);
	return response;
});
export const deleteMember = createAsyncThunk("members/delete", async id => {
	const response = await deleteById(id);
	return response;
});

const membersSlice = createSlice({
	name: "members",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getMembersByPageAndSearch.pending, (state, { payload }) => {
			return { ...state, isLoading: true };
		});
		builder.addCase(getMembersByPageAndSearch.fulfilled, (state, { payload }) => {
			return { ...state, list: payload, isLoading: false };
		});
		builder.addCase(getdMembersBySearch.pending, (state, { payload }) => {
			return { ...state, isLoading: true };
		});
		builder.addCase(getdMembersBySearch.fulfilled, (state, { payload }) => {
			return { ...state, list: payload, isLoading: false };
		});
		builder.addCase(getMemberById.pending, (state, { payload }) => {
			return { ...state, isLoading: true };
		});
		builder.addCase(getMemberById.fulfilled, (state, { payload }) => {
			return { ...state, edit: payload, isLoading: false };
		});
		builder.addCase(getAmountOfMembers.pending, (state, { payload }) => {
			return { ...state, isLoading: true };
		});
		builder.addCase(getAmountOfMembers.fulfilled, (state, { payload }) => {
			return { ...state, amount: payload, isLoading: false };
		});
		builder.addCase(createMember.fulfilled, (state, { payload }) => {
			return { ...state, list: payload };
		});
		builder.addCase(editMember.fulfilled, (state, { payload }) => {
			return { ...state, list: payload };
		});
		builder.addCase(deleteMember.fulfilled, (state, { payload }) => {
			return { ...state, list: payload };
		});
	},
});

export default membersSlice.reducer;
