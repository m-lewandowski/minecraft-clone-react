import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Sky from "components/Sky";
import Ground from "components/Ground";
import Player from "components/Player";
import Camera from "components/Camera";
import Blocks from "components/Blocks";
import Inventory from "components/Inventory";
import Cursor from "components/Cursor";

const App = () => {
  return (
    <div className="fixed h-screen w-screen select-none">
      <Canvas>
        <Sky />
        <Camera />
        <Physics>
          <Player />
          <Blocks />
          <Ground />
        </Physics>
      </Canvas>
      <Inventory />
      <Cursor />
    </div>
  );
};

export default App;
