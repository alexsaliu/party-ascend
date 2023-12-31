// @ts-nocheck

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export default function Barrier(props) {
    const group = useRef();

    const { nodes, materials, animations } = useGLTF("/models/barrier.glb");
    const { actions } = useAnimations(animations, group);
  
    return (
      <group ref={group} {...props} dispose={null}>
        <group name="Scene" position={[0,-.2,0]}>
          <RigidBody type="fixed" colliders="trimesh">
            <mesh
              name="Barrier"
              castShadow
              receiveShadow
              geometry={nodes.Barrier.geometry}
              material={nodes.Barrier.material}
            //   visible={false}
            >
                <meshBasicMaterial color="white" transparent opacity={0} />
            </mesh>
          </RigidBody>
        </group>
      </group>
    );
  }
  
  useGLTF.preload("/models/barrier.glb");
  