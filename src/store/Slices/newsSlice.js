import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAllByPageAndSearch, create,update, deleteById, findAllAndSearch, findById } from "Services/News/NewsApiServices";

const initialState = {
    news: [],
    amount: 0,
    newToModify: {}, 
    isLoading: true
}

export const newsList = createAsyncThunk( "news/get", async(body)=>{
        const res = await findAllByPageAndSearch(body.page, body.search)
        return res
})

export const createNews = createAsyncThunk( "news/create", async(body)=>{
    const res = await create(body) 
    return res
})

export const updateNew = createAsyncThunk( "new/update", async({id, body})=>{
    const res = await update(id, body) 
    return res
})

export const deleteNews = createAsyncThunk( "news/delete", async(id)=>{
    const res =await deleteById(id) 
    return res
})

export const findNew = createAsyncThunk("new/getNew" , async (id)=>{
    const res = await findById(id)
    return res
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
            state.userToModify = {}
            state.isLoading = false
        })
        .addCase(createNews.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(createNews.fulfilled, (state, {payload})=>{
            state.news.push(payload);
            state.isLoading = false
        })
        .addCase(updateNew.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(updateNew.fulfilled, (state, {payload})=>{
            state.isLoading = false
        })
        .addCase(deleteNews.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(deleteNews.fulfilled, (state, {payload})=>{
            state.isLoading = false
        })
        .addCase(findNew.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(findNew.fulfilled, (state, {payload})=>{
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