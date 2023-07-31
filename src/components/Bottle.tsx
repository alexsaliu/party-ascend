import React, { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, MeshTransmissionMaterial, Text } from "@react-three/drei"
import { Mesh } from "three"
import gsap from "gsap"
import { useStore, gameStates } from "../store.ts"
import {useState} from "react"
export default function Bottle() {

  const { nodes } = useGLTF("/models/bottle.glb")
  // console.log(nodes)
  const bottle = useRef<Mesh>(null)
  const setColor = useStore((state) => state.setColor)
  const startPlatformSpin = useStore((state) =>  state.startPlatformSpin)
  const color = useStore((state) => state.color)
  const colorName = useStore((state) => state.colorName)
  const [visible, setVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  // console.log(color)

  const colorMap = {
    green2: "#a2f4c1",
    blue2: "#a6e7f0",
    yellow1: "#fce177",
    red1: "#f26c73",
    green1: "#a2f4c1",
    blue1: "#a6e7f0",
    yellow2: "#fce177",
    red2: "#f26c73"
  }
  
  const colors = [...Object.keys(colorMap)]

  const computeColor = (rotation: number) => {
    const circle = Math.PI * 2
    const radians = rotation % circle
    const pieSlice = circle / 8
    const index = Math.floor(radians / pieSlice)
    const newColor = colors[index]
    setColor(newColor)
    console.log(colorName)

  }

  const spinAnimation = (object: Mesh, spin: number) => {
    computeColor(object.rotation.z + spin)
    gsap.to(object.rotation, {
      delay: 1,
      z: `+=${spin}`,
      duration: 1.5,
      ease: "Power3.easeOut",
      onComplete: () => startPlatformSpin(),
    })
  }

  useEffect(() =>
  {
      const unsubscribeSpinBottle = useStore.subscribe(
          (state) => state.gameState,
          (value) =>
          {
              if(value === gameStates.BOTTLESPIN)
              {
                  setVisible(true)
                  spinAnimation(bottle.current, Math.random() * 10)
                  setTimeout(() => {
                    setTextVisible(true)
                  }, 2000);
              }
          }
      )
      const unsubscribePlatfromSpin = useStore.subscribe(
        (state) => state.gameState,
        (value) =>
        {
            if(value === gameStates.PLATFORMSPIN)
            {
                setVisible(false)
                setTextVisible(false)
            }
        }
    )
      return () =>
      {
        unsubscribeSpinBottle()
        unsubscribePlatfromSpin()
      }
  }, [])

  return (
    <group dispose={null} scale={[2, 2, 2]} position={[0,0,0]}>
      <mesh
        rotation-z={0}
        ref={bottle}
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        // material={materials.Default}
        visible={visible}
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
          color={"green"}
        />
      </mesh>
      <Text visible={textVisible} fontSize={.5} color={color}> {colorName.slice(0, -1)}</Text>
    </group>
  )
}

useGLTF.preload("/models/bottle.glb")
