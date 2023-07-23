import Baloon from "./Baloon";

function Platform() {
  return (
    <group>
      <Baloon color={"red"} position={[-3, 0, 0]} />
      <Baloon position={[-1, 0, 0]} />
      <Baloon position={[1, 0, 0]} />
      <Baloon position={[3, 0, 0]} />
    </group>
  );
}

export default Platform;
