import { blocksData } from "assets/blockTypes";
import { throttle } from "lodash";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSelectedItem,
  inventoryActionTypes,
  MAX_INVENTORY_ITEMS,
} from "store/slices/blocksSlice";

const Inventory = () => {
  const { selectedItem, inventoryItems } = useSelector(
    (state) => state.blocks.inventory
  );
  const dispatch = useDispatch();

  const cursorPosition = useMemo(() => {
    const position = (100 / MAX_INVENTORY_ITEMS) * selectedItem;
    return position.toFixed(3);
  }, [selectedItem]);

  const handleWheel = useCallback(
    (e) => {
      const { deltaY } = e;
      if (deltaY > 2) {
        dispatch(
          changeSelectedItem({
            type: inventoryActionTypes.INCREASE_SELECTED_ITEM,
          })
        );
      }
      if (deltaY < -2) {
        dispatch(
          changeSelectedItem({
            type: inventoryActionTypes.DECREASE_SELECTED_ITEM,
          })
        );
      }
    },
    [dispatch]
  );

  const handleWheelThrottled = useMemo(
    () => throttle(handleWheel, 200),
    [handleWheel]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheelThrottled);
    return () => window.removeEventListener("wheel", handleWheelThrottled);
  }, [handleWheelThrottled]);

  return (
    <div className="fixed z-10 bottom-0 left-1/2 -translate-x-1/2 h-16 bg-black/30 flex border-2 border-zinc-500 font-display text-white">
      {Array.from(Array(MAX_INVENTORY_ITEMS)).map((item, index) => {
        if (inventoryItems[index]) {
          const { name, amount } = inventoryItems[index];
          return (
            <div
              className="relative w-16 border-4 border-zinc-500 text-sm"
              key={index}
            >
              <span className="absolute bottom-0 right-0">{amount}</span>
              <img
                src={blocksData[name].img}
                alt={name}
                className="w-full h-full"
              />
            </div>
          );
        } else {
          return (
            <div className="w-16 border-4 border-zinc-500" key={index}></div>
          );
        }
      })}
      <div
        className="absolute top-0 h-full w-16 border-4 border-zinc-400 transition-all duration-100"
        style={{ left: `${cursorPosition}%` }}
      ></div>
    </div>
  );
};

export default Inventory;
