import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import cardTemplate from "./cardTemplate";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    cardTemplateSlice: cardTemplate,
  },
});

export default store;
