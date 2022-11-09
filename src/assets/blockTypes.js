import cobblestoneImg from "./cobblestone.png";
import dirtImg from "./dirt.png";

export const blockTypes = {
  DIRT: "DIRT",
  COBBLESTONE: "COBBLESTONE",
};

export const blocksData = {
  [blockTypes.DIRT]: {
    texture: "dirtTexture",
    img: dirtImg,
  },
  [blockTypes.COBBLESTONE]: {
    texture: "cobblestoneTexture",
    img: cobblestoneImg,
  },
};
