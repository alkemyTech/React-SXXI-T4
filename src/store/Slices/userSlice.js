import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAdmin, getUsersAdmin, deleteUserAdmin, putUserAdmin, postUserAdmin, getAmountOfUsersAdmin } from "Services/UsersAdmin/ApiService"


const initialState ={
    users: [],
    amount: 0,
    userToModify: {},
    isLoading: true
}

export const getAllUsers = createAsyncThunk ("users/getAll", async({amountToShow, page, filterTypeOfUser, inputFilter})=>{
    const res= await getUsersAdmin(amountToShow, page, filterTypeOfUser, inputFilter);
    return res
})

export const getUser = createAsyncThunk("user/getOne", async(id)=>{
    const res = await getUserAdmin(id)
    return res
}) 

export const deleteUser = createAsyncThunk("user/deleteUser", async(id)=>{
    const res = await deleteUserAdmin(id)
    return res
}) 

export const putUser = createAsyncThunk("user/putUser", async({id, values})=>{
    const res = await putUserAdmin(id, values)
    console.log(id)
    console.log(values)
    return res
}) 

export const postUser = createAsyncThunk("user/postUser", async(values)=>{
    const res = await postUserAdmin(values)
    return res
}) 

export const amount = createAsyncThunk("user/amount", async({filterTypeOfUser, inputFilter})=>{
    const res = await getAmountOfUsersAdmin( filterTypeOfUser, inputFilter)
    console.log(res)
    return res
}) 

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: builder=>{
        builder.addCase(getAllUsers.pending, (state, {payload}) =>{
            state.isLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, {payload})=>{
            state.userToModify = {}
            state.users = payload
            state.isLoading = false
        })
        .addCase(getUser.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(getUser.fulfilled, (state, {payload})=>{
            state.userToModify = payload
            state.isLoading = false
        })
        .addCase(deleteUser.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled, (state, {payload})=>{
            state.isLoading = false
        })
        .addCase(postUser.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(postUser.fulfilled, (state, {payload})=>{
            state.users.push(payload);
            state.isLoading = false
        })
        .addCase(putUser.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(putUser.fulfilled, (state, {payload})=>{
            
            state.isLoading = false
        })
        .addCase(amount.pending, (state, {payload})=>{
            state.isLoading = true
        })
        .addCase(amount.fulfilled, (state, {payload})=>{
            state.amount = payload
            state.isLoading = false
        })
    }
})

export default usersSlice.reducer