import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "hooks/useKeyboard";

export const useControls = () => {
  const { jump, forward, backward, right, left } = useKeyboard();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1.6, 0],
  }));

  const { camera } = useThree();

  const position = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((x) => {
      position.current = x;
    });
  }, [api.position]);

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((x) => {
      velocity.current = x;
    });
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(new Vector3(...position.current));

    const directionVector = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0)
    );
    const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);

    directionVector
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(3)
      .applyEuler(camera.rotation);

    api.velocity.set(directionVector.x, velocity.current[1], directionVector.z);

    if (jump && Math.abs(velocity.current[1]) < 0.0001) {
      api.velocity.set(velocity.current[0], 3.5, velocity.current[2]);
    }
  });

  return ref;
};
