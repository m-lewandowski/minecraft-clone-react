import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

const Player = () => {
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
  });

  return <mesh ref={ref}></mesh>;
};

export default Player;
