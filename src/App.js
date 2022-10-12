import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Sky from "components/Sky";
import Ground from "components/Ground";

const App = () => {
  return (
    <div className="h-screen select-none">
      <Canvas>
        <Sky />
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;
