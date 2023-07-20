import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName:"",
    jwt:""
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        changeUserName:(state, action)=>{
            state.userName = action.payload;
        },
        changeJwt:(state,action)=>{
            state.jwt = action.payload;
        }
    }
});

export const {changeUserName, changeJwt} = userSlice.actions;
export default userSlice.reducer;