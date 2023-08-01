
// @ts-nocheck

import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { RigidBody, CylinderCollider } from "@react-three/rapier"
import * as THREE from "three"
import { useStore, gameStates } from "../store.ts"
import gsap from 'gsap'

export default function PieMeshes(props) {
    const group = useRef()
    const pieColliders = useRef()
    const { nodes, materials, animations } = useGLTF("/models/pieMeshes.glb")

    const filteredNodes = Object.keys(nodes).filter(
        (nodeName) => nodes[nodeName] instanceof THREE.Mesh
    )
    
    const [isSpinning, setIsSpinning] = useState(false);
    const setColorHovered = useStore((state) => state.setColorHovered)
    const startGame = useStore((state) => state.startGame)
    const gameState = useStore((state) => state.gameState)

    const materialColors = [
        "Material.001",
        "Material.004",
        "Material.003",
        "Material.002"
    ]
    const colors = ["red1", "green1", "blue1", "yellow2","red2", "green2", "blue2", "yellow1"]

    // Create an array of refs for each mesh
    const meshRefs = useRef(filteredNodes.map(() => useRef()));
    const [targetQuaternion, setTargetQuaternion] = useState(new THREE.Quaternion());
    const speed = 1;
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationStartTime, setAnimationStartTime] = useState(0);

    useFrame(() => {
        if (isAnimating) {
            const time = performance.now();
            const elapsed = time - animationStartTime;

            // Use GSAP's easing function to ease the elapsed time from 0 to 1
            const progress = Math.min(1, Math.max(0, elapsed / (speed * 1000)));

            // Calculate the current rotation angle using the eased progress
            const rotationAngle = progress * Math.PI * 2;

            const rotation = new THREE.Quaternion();
            rotation.setFromEuler(new THREE.Euler(0, rotationAngle, 0));

            // Check if the current rotation is close to the target quaternion
            const epsilon = 0.01;
            if (rotation.angleTo(targetQuaternion) < epsilon) {
            setIsAnimating(false); // Stop animating when the target is reached
            startGame();
            }

            // Iterate through the meshRefs array and update each mesh's kinematic rotation
            meshRefs.current.forEach((meshRef) => {
            if (meshRef.current) {
                meshRef.current.setNextKinematicRotation(rotation);
            }
            });
        }
    });

    // Function to start spinning to the target quaternion
    const startSpinning = () => {
        setIsAnimating(true);
        setAnimationStartTime(performance.now());
    };

    useEffect(() =>
    {
        const unsubscribeSpinPlatform = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.PLATFORMSPIN)
                {
                    startSpinning();
                }
            }
        )
        return () =>
        {
          unsubscribeSpinPlatform()
        }
    }, [])

    return (
        <group ref={group} {...props} dispose={null}>
        <RigidBody  colliders={false} type="fixed" position-y={-0} friction={2}>
            <CylinderCollider args={[0.1, 2.8]} position={[0, 0, 0]} />
        </RigidBody>
        <group name="Scene" >
            {filteredNodes.map((nodeName, index) => {
            const node = nodes[nodeName]
            return (
                
                <RigidBody
                    ref={meshRefs.current[index]} // Assign the ref to the corresponding mesh
                    type="kinematicPosition"
                    key={index}
                    // type="fixed"
                    position-y={0.02}
                    friction={2}
                    colliders="hull"
                    sensor
                    onIntersectionEnter={() => {
                    setColorHovered(colors[index % 8])
                    // console.log(`enter ${colors[index % 4]}`)
                    }}
                >
                    <mesh
                        name={nodeName}
                        castShadow
                        receiveShadow
                        geometry={node.geometry}
                        material={materials[materialColors[index % 4]]}
                    >
                    {/* <meshBasicMaterial color="white" transparent opacity={0} /> */}
                    </mesh>
                </RigidBody>
                
            )
            })}
        </group>
        </group>
    )
}

useGLTF.preload("/models/pieMeshes.glb")
