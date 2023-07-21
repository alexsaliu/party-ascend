import type { Position, Rotation, Color } from "../types.ts";

type Props = {
  position?: Position;
  rotation?: Rotation;
  color?: Color;
};

function Baloon({ position, rotation, color }: Props) {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default Baloon;
