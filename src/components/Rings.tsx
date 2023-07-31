
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useStore, gameStates } from "../store.ts"
import { useFrame } from "@react-three/fiber";

import gsap from "gsap";
export default function Rings(props) {
    const group = useRef();
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    const { nodes, materials, animations } = useGLTF("/models/rings.glb");
    const { actions } = useAnimations(animations, group);
    const [ringsActive, setRingsActive] = React.useState(false);
    const gameState = useStore((state) => state.gameState)

    useFrame((state) => {
          ring1.current.rotation.z += 0.01;
          ring2.current.rotation.x += 0.01;
          ring3.current.rotation.z += 0.01;
      });


    useEffect(() =>
    {
        const unsubscribeSpinPlatform = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.PLATFORMSPIN)
                {
                    setRingsActive(true)
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
        <group name="Scene">
            <mesh
            ref={ring3}
            name="OuterRing"
            castShadow
            receiveShadow
            geometry={nodes.OuterRing.geometry}
            material={materials["Material.003"]}
            />
            <mesh
            ref={ring2}
            name="OuterRing001"
            castShadow
            receiveShadow
            geometry={nodes.OuterRing001.geometry}
            material={materials["Material.001"]}
            />
            <mesh
            ref={ring1}
            name="OuterRing002"
            castShadow
            receiveShadow
            geometry={nodes.OuterRing002.geometry}
            material={materials["Material.003"]}
            />
        </group>
        </group>
    );
}

useGLTF.preload("/models/rings.glb");
