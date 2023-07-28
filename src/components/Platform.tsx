// import React, { } from "react";
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Ref, useRef, useState } from "react"
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from "three"
// import * as THREE from '@three'

export default function BalloonPlatform({ position, ...props }) {
  const { nodes, materials } = useGLTF("/models/balloon-platform.glb")

  const [locked, setLocked] = useState(false)

  const meshRef = useRef<Mesh>(null!)

  console.log(meshRef?.current?.position.y)

  function moveBalloonUp() {
    if (!locked) {
      meshRef.current.position.y += 0.015
    }
  }

  useFrame(() => {
    const handleSpacebarPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setLocked(true)
      }
    }

    // attach the event listener
    window.addEventListener("keydown", handleSpacebarPress)

    moveBalloonUp()
  })

  return (
    <group {...props} dispose={null} position={position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Balloon_ballon_0006.geometry}
        material={materials["Material.001"]}
      />
    </group>
  )
}

useGLTF.preload("/models/balloon-platform.glb")
