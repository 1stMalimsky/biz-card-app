import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import nameSliceReducer from "./nameSlice";


import darkThemeReducer from "./darkTheme"


const store = configureStore({
    reducer: {
        counterSlice: counterReducer,
        nameSlice: nameSliceReducer,
        darkThemeSlice: darkThemeReducer
    },
});

export default store;