import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAllByPageAndSearch } from "Services/News/NewsApiServices";

const initialState = {
    news: "",
    error: ""
}

export const newsList = createAsyncThunk( "news", async(body)=>{
        const res = await findAllByPageAndSearch(body.page, body.search)
        return res
})

const newsSlice = createSlice({
    name: "news",
    initialState,   
    extraReducers: builder=>{
        builder.addCase(newsList.fulfilled, (state, {payload})=>{
            state.news = payload
        })
    }
})

export default newsSlice.reducer