import { createSlice } from "@reduxjs/toolkit";
import { blockTypes } from "assets/blockTypes";
import { nanoid } from "nanoid";

const initialState = [];

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      return [
        ...state,
        {
          id: nanoid(),
          position: action.payload.position,
          type: blockTypes.DIRT,
        },
      ];
    },
    removeBlock: (state, action) => {
      return [...state].filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addBlock, removeBlock } = blocksSlice.actions;

export default blocksSlice.reducer;
