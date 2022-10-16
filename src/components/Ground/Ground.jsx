import { usePlane } from "@react-three/cannon";
import { grassTexture } from "assets/textures";
import { useDispatch } from "react-redux";
import { addBlock } from "store/slices/blocksSlice";
import { RepeatWrapping } from "three";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    const position = Object.values(e.point).map((value) => Math.ceil(value));
    dispatch(addBlock({ position }));
  };

  grassTexture.wrapS = RepeatWrapping;
  grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(100, 100);

  return (
    <mesh ref={ref} receiveShadow onClick={handleClick}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};

export default Ground;
