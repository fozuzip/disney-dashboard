import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import counterReducer from "@/store/slices/counterSlice";
import { disneyApi } from "@/services/disneyApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [disneyApi.reducerPath]: disneyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(disneyApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
