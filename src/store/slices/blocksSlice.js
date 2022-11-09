import { createSlice } from "@reduxjs/toolkit";
import { blockTypes } from "assets/blockTypes";
import { nanoid } from "nanoid";

const inventoryItems = Object.values(blockTypes).map((item) => ({
  name: item,
  amount: 64,
}));

const initialState = {
  blocksPositions: [],
  inventory: { selectedItem: 1, inventoryItems },
};

export const inventoryActionTypes = {
  INCREASE_SELECTED_ITEM: "INCREASE_SELECTED_ITEM",
  DECREASE_SELECTED_ITEM: "DECREASE_SELECTED_ITEM",
};

export const MAX_INVENTORY_ITEMS = 9;

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const { selectedItem, inventoryItems } = state.inventory;
      const selectedBlock = inventoryItems[selectedItem];
      if (!selectedBlock || selectedBlock.amount < 1) return state;
      const blockType = inventoryItems[selectedItem].name;
      const updatedInventoryItems = [...inventoryItems];
      updatedInventoryItems[selectedItem] = {
        ...selectedBlock,
        amount: selectedBlock.amount - 1,
      };
      return {
        inventory: {
          selectedItem,
          inventoryItems: updatedInventoryItems,
        },
        blocksPositions: [
          ...state.blocksPositions,
          {
            id: nanoid(),
            position: action.payload.position,
            type: blockType,
          },
        ],
      };
    },
    removeBlock: (state, action) => {
      const {
        blocksPositions,
        inventory: { inventoryItems, selectedItem },
      } = state;
      const { id } = action.payload;
      const index = state.blocksPositions.findIndex((item) => item.id === id);
      const blockType = blocksPositions[index].type;
      const updatedInventoryItems = inventoryItems.map((item) => {
        if (item.name === blockType) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });

      return {
        inventory: {
          selectedItem,
          inventoryItems: updatedInventoryItems,
        },
        blocksPositions: [...blocksPositions].filter((item) => item.id !== id),
      };
    },
    changeSelectedItem: (state, action) => {
      const { type } = action.payload;
      const { INCREASE_SELECTED_ITEM, DECREASE_SELECTED_ITEM } =
        inventoryActionTypes;
      const { selectedItem } = state.inventory;
      if (type === INCREASE_SELECTED_ITEM) {
        const newSelectedItem =
          selectedItem === MAX_INVENTORY_ITEMS - 1 ? 0 : selectedItem + 1;
        return {
          ...state,
          inventory: { ...state.inventory, selectedItem: newSelectedItem },
        };
      }
      if (type === DECREASE_SELECTED_ITEM) {
        const newSelectedItem =
          selectedItem === 0 ? MAX_INVENTORY_ITEMS - 1 : selectedItem - 1;
        return {
          ...state,
          inventory: { ...state.inventory, selectedItem: newSelectedItem },
        };
      }
      return state;
    },
    changeBlocksAmount: (state) => {
      return state;
    },
  },
});

export const { addBlock, removeBlock, changeSelectedItem, changeBlocksAmount } =
  blocksSlice.actions;

export default blocksSlice.reducer;
