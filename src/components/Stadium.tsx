// @ts-nocheck

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Stadium(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/stadium.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" >
        <group name="Stadium" position={[0,0, 0]}>
          <mesh
            name="Cylinder023"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder023.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            name="Cylinder023_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder023_1.geometry}
            material={materials["Material.006"]}
          />
          <mesh
            name="Cylinder023_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder023_2.geometry}
            material={materials["Material.007"]}
          />
          <mesh
            name="Cylinder023_3"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder023_3.geometry}
            material={materials["Material.011"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/stadium.glb");
