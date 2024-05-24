import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    allStories: []
})


const pitchboardSlice = createSlice({
    name: "pitchboard",
    initialState,
    reducers: {
        setStories: (state, action) => {
            console.log(action)
            state.allStories = action.payload.response
        },

        addStory: (state, action) => {
            state.allStories.push(action.payload);
        },
        updateStory: () => { },
        deleteStory: () => { },
        rejectStory: () => { },
    }
});

export const { addStory, updateStory, deleteStory, rejectStory, setStories } = pitchboardSlice.actions;
export default pitchboardSlice.reducer;