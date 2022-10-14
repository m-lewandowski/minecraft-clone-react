import { useControls } from "hooks/useControls";

const Player = () => {
  const ref = useControls();

  return <mesh ref={ref}></mesh>;
};

export default Player;
