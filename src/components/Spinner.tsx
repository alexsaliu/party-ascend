import Bottle from "./Bottle"

export default function Spinner() {
  return (
    <group rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.8, 0]}>
      <Bottle />
    </group>
  )
}
