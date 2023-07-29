import React, { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
    Physics,
    RigidBody,
    RigidBodyProps,
    MeshCollider,
    CylinderCollider
} from "@react-three/rapier";

export default function SpinnerPlatform(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/models/spinPlatform.glb");
    // const { actions } = useAnimations(animations, group);
    const [intersecting, setIntersection] = useState(false);

    // Array of objects defining each mesh and its properties
    const meshData = [
        { name: "Cylinder", material: nodes.Cylinder.material, color: "none" },
        { name: "Cylinder001", material: materials["Material.001"], color: "red" },
        { name: "Cylinder002", material: materials["Material.002"], color: "yellow" },
        { name: "Cylinder003", material: materials["Material.003"], color: "blue" },
        { name: "Cylinder004", material: materials["Material.004"], color: "green" },
        { name: "Cylinder005", material: materials["Material.005"], color: "red" },
        { name: "Cylinder006", material: materials["Material.007"], color: "yellow" },
        { name: "Cylinder007", material: materials["Material.006"], color: "blue" },
        { name: "Cylinder008", material: materials["Material.008"], color: "green" },
      ];

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                {/* Main Cylinder */}
                <RigidBody
                    colliders={false}
                    type="fixed"
                    position-y={-0}
                    friction={2}
                >
                    <CylinderCollider args={[.1, 21]} position={[0,-.1,0]}>
                    <mesh
                        name="Cylinder"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder.geometry}
                        material={nodes.Cylinder.material}
                        position={[0, -0.124, 0]}
                    />
                    </CylinderCollider>
                </RigidBody>
                {/* Loop through the meshData array to create other cylinders */}
                {meshData.map((meshInfo, index) => (
                    meshInfo.name !== 'Cylinder' ? (
                    <RigidBody
                        key={index}
                        type="fixed"
                        position-y={0.05}
                        friction={2}
                        colliders="hull"
                        sensor
                        onIntersectionEnter={() => {
                            setIntersection(true);
                            console.log(`enter ${meshInfo.color}`);
                        }}
                        onIntersectionExit={() => setIntersection(false)}
                    >
                        <mesh
                            name={meshInfo.name}
                            castShadow
                            receiveShadow
                            geometry={nodes[meshInfo.name].geometry}
                            material={meshInfo.material}
                            position={[0, -0.124, 0]}
                        />
                    </RigidBody>
                    ) : (
                        null
                    )
                ))}
            </group>
        </group>
    );
}

useGLTF.preload("/models/spinPlatform.glb");