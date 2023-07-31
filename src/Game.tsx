import { useRef } from "react";
import { extend, useFrame, Object3DNode } from "@react-three/fiber";
import { Mesh } from "three";
import { CharacterController } from "./components/CharacterController";
import SpinnerPlatform2 from "./components/SpinnerPlatform2";
import Bottle from "./components/Bottle";
import { useEffect } from "react";
import { useStore, gameStates } from "./store";

function Game() {

	return (
			<>
				<group rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.8, 0]}>
					<Bottle />
				</group>
				<group position-y={-1}>
					<SpinnerPlatform2  position-y={.1}/>
					<CharacterController /> 
				</group>
			</>
	);
}

export default Game;
