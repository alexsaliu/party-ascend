import { Canvas } from "@react-three/fiber";
import Game from "./Game.tsx";
import { Environment, Lightformer } from "@react-three/drei";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" resolution={1024}/>
      <Game />
    </Canvas>
  );
}

export default App;
