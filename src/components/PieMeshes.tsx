/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function PieMeshes(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/pieMeshes.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="PieMesh001"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh001.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          name="PieMesh010"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh010.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          name="PieMesh011"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh011.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          name="PieMesh012"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh012.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          name="PieMesh013"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh013.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          name="PieMesh014"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh014.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          name="PieMesh015"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh015.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          name="PieMesh016"
          castShadow
          receiveShadow
          geometry={nodes.PieMesh016.geometry}
          material={materials["Material.007"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/pieMeshes.glb");