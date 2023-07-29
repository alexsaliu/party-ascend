import { Canvas } from "@react-three/fiber";
import Game from "./Game.tsx";
import { Environment,  KeyboardControls } from "@react-three/drei";
import {  useMemo } from "react";
import { Physics } from "@react-three/rapier";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
    <Canvas shadows camera={{ position: [0, 0, 7], fov: 30 }}>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" resolution={1024}/>
      <Physics debug>
        <Game />
      </Physics>
    </Canvas>
    </KeyboardControls>
  );
}

export default App;
