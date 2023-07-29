import { useEffect, useState, useRef } from "react"
import { Image } from "@react-three/drei"
import Bottle from "./Bottle"

export default function Spinner() {
  type fn = () => void

  const [color, setColor] = useState("#FF0000")

  useEffect(() => {
    // console.log(color, 'bottle color')
  }, [color])

  return (
    <group>
      <Bottle setColor={setColor} position={[0, 1.5, 0]} />
      <Image
        position={[0, 1.5, 0]}
        scale={[0.5, 0.5]}
        url="/images/spin.png"
        transparent
        toneMapped={false}
      />
    </group>
  )
}
