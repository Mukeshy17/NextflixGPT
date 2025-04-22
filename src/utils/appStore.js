import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

export const appStore = configureStore({
  reducer: {
    user: useReducer,
    movies: moviesReducer,
  },
})