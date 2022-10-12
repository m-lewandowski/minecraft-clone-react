import { Sky as SkyThree } from "@react-three/drei";
import { Vector3 } from "three";

const Sky = () => (
  <>
    <SkyThree
      distance={40000}
      sunPosition={new Vector3(0, 1, 0)}
      inclination={50}
      azimuth={90}
    />
    <ambientLight intensity={0.3} />
    <pointLight
      castShadow
      intensity={0.8}
      position={new Vector3(100, 100, 100)}
    />
  </>
);

export default Sky;
