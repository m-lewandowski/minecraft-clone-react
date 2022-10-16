import { useBox } from "@react-three/cannon";
import { blocksData } from "assets/blockTypes";
import * as textures from "assets/textures";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addBlock, removeBlock } from "store/slices/blocksSlice";

const Block = ({ id, position, type }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.which === 3 || e.altKey) {
      dispatch(removeBlock({ id }));
      return;
    }
    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;
    let newBlockPosition = [];
    switch (clickedFace) {
      case 0:
        newBlockPosition = [x + 1, y, z];
        break;
      case 1:
        newBlockPosition = [x - 1, y, z];
        break;
      case 2:
        newBlockPosition = [x, y + 1, z];
        break;
      case 3:
        newBlockPosition = [x, y - 1, z];
        break;
      case 4:
        newBlockPosition = [x, y, z + 1];
        break;
      case 5:
        newBlockPosition = [x, y, z - 1];
        break;
      default:
        return;
    }
    dispatch(addBlock({ position: newBlockPosition }));
  };

  const texture = useMemo(() => textures[blocksData[type].texture], [type]);

  return (
    <mesh ref={ref} onClick={handleClick}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Block;
