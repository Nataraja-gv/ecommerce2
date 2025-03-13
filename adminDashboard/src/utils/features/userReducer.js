import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"admin",
    initialState:null,
    reducers:{
        addAdmin:(state,action)=>{
            return action.payload
        },
        removeAdmin:(state,action)=>{
            return null
        }
    }
})

export  const {addAdmin,removeAdmin}= userSlice.actions;
export default userSlice.reducer;