import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

const Camera = () => {
  const { camera, gl } = useThree();

  return <PointerLockControls args={[camera, gl.domElement]} />;
};

export default Camera;
