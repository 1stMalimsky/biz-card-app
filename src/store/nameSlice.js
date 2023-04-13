import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Kenny",
    age: 9,
    hometown: "South Park"
}

const nameSlice = createSlice({
    name: "names",
    initialState,
    reducers: {
        addDot(state) {
            state.name = state.name + "!"
        }
    }
}
);


export const nameActions = nameSlice.actions;

export default nameSlice.reducer;