import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";

export const appStore = configureStore({
  reducer: {
    user: useReducer,
    movies: moviesReducer,
    gpt: gptReducer,
  },
})