import { useRef } from "react";
import { extend, useThree, useFrame, Object3DNode } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Platform from "./components/Platform";

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
  }
}

function Game() {
  const boxRef = useRef<Mesh>(null);

  const { camera, gl } = useThree();

  extend({ OrbitControls });

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <Platform />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
      <mesh
        ref={boxRef}
        rotation-y={Math.PI * 0.25}
        position-x={3}
        position-y={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
    </>
  );
}

export default Game;
