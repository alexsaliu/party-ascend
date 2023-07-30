import { useRef } from "react";
import { extend, useFrame, Object3DNode } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import PlatformSpawnManager from "./components/PlatformSpawnManager";
import Spinner from "./components/Spinner";
import { CharacterController } from "./components/CharacterController";
// import SpinnerPlatform from "./components/SpinnerPlatform";
import SpinnerPlatform2 from "./components/SpinnerPlatform2";

declare module "@react-three/fiber" {
	interface ThreeElements {
		//comment
		orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
	}
}

function Game() {
	const boxRef = useRef<Mesh>(null);

	// const { camera, gl } = useThree();

	extend({ OrbitControls });

	useFrame((state, delta) => {
		if (boxRef.current) {
			boxRef.current.rotation.y += delta;
		}
	});

	return (
			<>
				{/* <orbitControls args={[camera, gl.domElement]} /> */}
				{/* <PlatformSpawnManager /> */}
				<Spinner />	
				<group position-y={-1}>
					<SpinnerPlatform2  position-y={.1}/>
					<CharacterController /> 
				</group>
			</>
	);
}

export default Game;
