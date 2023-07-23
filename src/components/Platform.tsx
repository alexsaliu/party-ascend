
// import React, { } from "react";
import { useGLTF } from "@react-three/drei";
// import * as THREE from '@three'

export default function BalloonPlatform({position, ...props}) {
  const { nodes, materials } = useGLTF("/models/balloon-platform.glb");
  return (
    <group {...props} dispose={null} position={position}>
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Balloon_ballon_0006.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("/models/balloon-platform.glb");