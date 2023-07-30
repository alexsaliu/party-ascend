import React, { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CylinderCollider } from "@react-three/rapier";
import * as THREE from "three";

export default function PieColliders(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/PieColliders.glb");
  const { actions } = useAnimations(animations, group);
  const [intersecting, setIntersection] = useState(false);

  // Define the array of colors for the mesh intersection logging
  const colors = ["Material.002", "Material.003", "Material.004", "Material.005", "Material.007", "Material.006", "Material.008", "Material.001"];

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {Object.keys(nodes).map((nodeName, index) => {
          const node = nodes[nodeName];
          if (node instanceof THREE.Mesh) {
            return (
                <>
                    <RigidBody
                        key={index}
                        type="fixed"
                        position-y={0.05}
                        friction={2}
                        colliders="hull"
                        sensor
                        onIntersectionEnter={() => {
                        setIntersection(true);
                        console.log(`enter ${colors[index]}`);
                        }}
                        onIntersectionExit={() => setIntersection(false)}
                    >
                        <mesh
                        name={nodeName}
                        castShadow
                        receiveShadow
                        geometry={node.geometry}
                        material={materials[colors[index]]}
                        //   visible={false}
                        >
                            <meshBasicMaterial color="white" transparent opacity={0} />
                        </mesh>
                    </RigidBody>
              </>
            );
          }
          return null; // Skip non-mesh nodes
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/models/PieColliders.glb");