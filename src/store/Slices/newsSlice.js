import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAllByPageAndSearch, create, update, deleteById, findAllAndSearch } from "Services/News/NewsApiServices";

const initialState = {
    news: [],
    amount: 0,
    isLoading: true
}

export const newsList = createAsyncThunk( "news/get", async(body)=>{
        const res = await findAllByPageAndSearch(body.page, body.search)
        return res
})

export const createNews = createAsyncThunk( "news/create", async(body)=>{
    await create(body) 
    return body
})

export const updateNews = createAsyncThunk( "news/update", async(body)=>{
    await update(body) 
    return body
})

export const deleteNews = createAsyncThunk( "news/delete", async(id)=>{
    await deleteById(id) 
    return id
})

export const getAmount = createAsyncThunk( "news/amount", async(search)=>{
    const res = await findAllAndSearch(search) 
    return res.length
})

const newsSlice = createSlice({
    name: "news",
    initialState,   
    extraReducers: builder=>{
        builder.addCase(newsList.pending, (state, {payload})=>{
            state.isLoading = true 
        })
        .addCase(newsList.fulfilled, (state, {payload})=>{
            state.news = payload;
            state.isLoading = false
        })
        .addCase(createNews.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(createNews.fulfilled, (state, {payload})=>{
            state.news.push(payload);
            state.isLoading = false
        })
        .addCase(updateNews.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(updateNews.fulfilled, (state, {payload})=>{
            state.news = payload;
            state.isLoading = false
        })
        .addCase(deleteNews.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(deleteNews.fulfilled, (state, {payload})=>{
            state.isLoading = false
        })
        .addCase(getAmount.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(getAmount.fulfilled, (state, {payload})=>{
            state.amount = payload;
            state.isLoading = false
        })
    }
})

export default newsSlice.reducer