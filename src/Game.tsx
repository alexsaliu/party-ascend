import { useRef } from "react";
import { extend, useThree, useFrame, Object3DNode } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import PlatformSpawnManager from "./components/PlatformSpawnManager";
import Spinner from "./components/Spinner";
import { CharacterController } from "./components/CharacterController";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import {
  Cylinder,
} from "@react-three/drei";

declare module "@react-three/fiber" {
	interface ThreeElements {
		//comment
		orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
	}
}

function Game() {
	const boxRef = useRef<Mesh>(null);

	const { camera, gl } = useThree();

	extend({ OrbitControls });

	useFrame((state, delta) => {
		if (boxRef.current) {
			boxRef.current.rotation.y += delta;
		}
	});

	return (
			<>
				<orbitControls args={[camera, gl.domElement]} />
				<PlatformSpawnManager />
				<Spinner />
				<group position-y={-1}>
					<RigidBody
					colliders={false}
					type="fixed"
					position-y={-0.5}
					friction={2}
					>
					<CylinderCollider args={[1 / 2, 5]} />
					<Cylinder scale={[5, 1, 5]} receiveShadow>
						<meshStandardMaterial color="white" />
					</Cylinder>
					</RigidBody>
					<CharacterController />
				</group>
			</>
	);
}

export default Game;
