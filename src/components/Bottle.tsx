import React, { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei"
import { Mesh } from "three"
import gsap from "gsap"

type BottleProps = {
  setColor: (color: string) => void
}

export default function Bottle({ setColor, ...props }: BottleProps) {
  const { nodes } = useGLTF("/models/bottle.glb")
  // console.log(nodes)
  const bottle = useRef<Mesh>(null)
  //   useFrame((state, delta) => {
  //     if (bottle.current) {
  //       bottle.current.rotation.z -= delta
  //     }
  //   })

  const colorMap = {
    green: "#a2f4c1",
    blue: "#a6e7f0",
    yellow: "#fce177",
    red: "#f26c73",
  }

  const colors = [...Object.keys(colorMap), ...Object.keys(colorMap)]

  const computeColor = (rotation: number) => {
    const circle = Math.PI * 2
    const radians = rotation % circle
    const pieSlice = circle / 8
    const index = Math.floor(radians / pieSlice)
    const color = colors[index]
    setColor(color)
  }

  const spinAnimation = (object: Mesh, spin: number) => {
    computeColor(object.rotation.z + spin)
    gsap.to(object.rotation, {
      z: `+=${spin}`,
      duration: 1.5,
      ease: "Power3.easeOut",
      // onComplete: () => setColor("thing"),
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (bottle.current) {
        spinAnimation(bottle.current, Math.random() * 10)
      }
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <group {...props} dispose={null}>
      <mesh
        rotation-z={0}
        ref={bottle}
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        // material={materials.Default}
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
    </group>
  )
}

useGLTF.preload("/models/bottle.glb")
