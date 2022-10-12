import { Canvas } from "@react-three/fiber";

import Sky from "components/Sky";

const App = () => {
  return (
    <div className="h-screen select-none">
      <Canvas>
        <Sky />
      </Canvas>
    </div>
  );
};

export default App;
