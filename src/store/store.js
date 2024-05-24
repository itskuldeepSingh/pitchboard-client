import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import pitchboardSlice from "./pitchboardSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        pitchboard: pitchboardSlice
    }
})

export default store;
