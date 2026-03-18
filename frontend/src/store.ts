import { configureStore, createSlice } from "@reduxjs/toolkit";
import torrentMappingsSlice from "./store-slices/torrentsMappings";

const appSlice = createSlice({
  name: "app",
  initialState: {
    initialized: true,
  },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    torrentsMappings: torrentMappingsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
