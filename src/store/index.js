import { configureStore } from "@reduxjs/toolkit";
import blocksSlice from "store/slices/blocksSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksSlice,
  },
});
