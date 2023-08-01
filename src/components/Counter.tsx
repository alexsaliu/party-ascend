// @ts-nocheck

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, MeshTransmissionMaterial, Html , Image } from "@react-three/drei";
import gsap from "gsap";
import { useStore, gameStates } from "../store.ts"

export default function Counter(props) {

    const group = useRef();
    const checkColorMatch = useStore((state) => state.checkColorMatch)
    const endGame = useStore((state) => state.endGame)
    const { nodes, materials, animations } = useGLTF("/models/counter.glb");
    const { actions } = useAnimations(animations, group);
    const counterRef = useRef();

    function checkerFunction() {
        checkColorMatch()
        console.log("checkerFunction", checkColorMatch())
        endGame()
    }

    function countAnimation() {
        const counter = { value: 5 };
        const tl = gsap.timeline({});

        tl.to(counter, {
            duration: 3,
            value: 0,
            ease: 'none',
            onUpdate() {
                counterRef.current.innerHTML = Math.floor(counter.value);
            },
            onComplete: () => checkerFunction()
        });
    }

    useEffect(() =>
    {
        const unsubscribeSpinPlatform = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.GAME)
                {
                    countAnimation();
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
            name="Center"
            castShadow
            receiveShadow
            geometry={nodes.Center.geometry}
            material={nodes.Center.material}
            />
            <mesh
            name="Sphere"
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
        
            //   material={}
            >
                <MeshTransmissionMaterial
                distortionScale={0}
                temporalDistortion={0}
                samples={16}
                resolution={512}
                anisotropy={1}
                thickness={0.1}
                roughness={0}
                toneMapped={true}
                color={'mediumpurple'}
                />
            </mesh>
            <Image
                position={[0, 1.6, -3.8]}
                scale={[1.2, 1.2]}
                url="/images/counter-bg.png"
                transparent
                toneMapped={false}
            />
            <Html transform position={[0, 1.6, -3.8]} rotation={[0,0,0]} >
                <div className="counter" >
                    <div ref={counterRef} className="counter-number">5</div>
                </div>
            </Html>
        </group>
        </group>
    );
    }

useGLTF.preload("/models/counter.glb");
