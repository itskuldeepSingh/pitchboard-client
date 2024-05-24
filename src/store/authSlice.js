import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    status: false,
    userData: [],
    onlineUsers: [],
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload; //update current user details

        },

        logout: (state) => {
            state.status = false;
            state.userData = [];
        },


        updateOnlineUsers: (state, action) => {
            console.log(action)
            // state.onlineUsers.push(action.payload);
            state.onlineUsers = action.payload

        },
    }
})

export const { login, logout, updateOnlineUsers } = authSlice.actions
export default authSlice.reducer;