import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId:"",
    userName:"",
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUserName:(state, action)=>{
            state.userName = action.payload;
        },
        addUserId:(state, action)=>{
            state.userId = action.payload;
        },
    }
});

export const {addUserName, addUserId} = userSlice.actions;
export default userSlice.reducer;