import { createSlice } from "@reduxjs/toolkit";
import { blockTypes } from "assets/blockTypes";

const inventoryItems = Object.values(blockTypes).map((item) => ({
  name: item,
  amount: 64,
}));

const initialState = {
  selectedItem: 1,
  inventoryItems,
};

export const inventoryActionTypes = {
  INCREASE_SELECTED_ITEM: "INCREASE_SELECTED_ITEM",
  DECREASE_SELECTED_ITEM: "DECREASE_SELECTED_ITEM",
};

export const MAX_INVENTORY_ITEMS = 9;

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    changeSelectedItem: (state, action) => {
      const { type } = action.payload;
      const { INCREASE_SELECTED_ITEM, DECREASE_SELECTED_ITEM } =
        inventoryActionTypes;
      const { selectedItem } = state;
      if (type === INCREASE_SELECTED_ITEM) {
        const newSelectedItem =
          selectedItem === MAX_INVENTORY_ITEMS - 1 ? 0 : selectedItem + 1;
        return { ...state, selectedItem: newSelectedItem };
      }
      if (type === DECREASE_SELECTED_ITEM) {
        const newSelectedItem =
          selectedItem === 0 ? MAX_INVENTORY_ITEMS - 1 : selectedItem - 1;
        return { ...state, selectedItem: newSelectedItem };
      }
      return state;
    },
    changeBlocksAmount: (state) => {
      return state;
    },
  },
});

export const { changeSelectedItem, changeBlocksAmount } =
  inventorySlice.actions;

export default inventorySlice.reducer;
