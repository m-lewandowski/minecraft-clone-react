import { configureStore } from "@reduxjs/toolkit";
import blocksSlice from "store/slices/blocksSlice";
import inventorySlice from "./slices/inventorySlice";

export const store = configureStore({
  reducer: {
    blocks: blocksSlice,
    inventory: inventorySlice,
  },
});
