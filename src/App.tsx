import { Canvas, useFrame } from "@react-three/fiber"
import Game from "./Game.tsx"
import GameOverModal from "./components/Modals/GameOverModal.tsx"
import StartModal from "./components/Modals/StartModal.tsx"
import WinnerModal from "./components/Modals/WinnerModal.tsx"
import {useStore, gameStates} from "./store"
import {
  Environment,
  KeyboardControls,
  Points,
  PointMaterial,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls
} from "@react-three/drei"
import { useMemo, useState, useRef, useEffect } from "react"
import { Physics } from "@react-three/rapier"
import * as random from "maath/random/dist/maath-random.esm"
import { func } from "three/examples/jsm/nodes/Nodes.js"

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump"
}

function App() {
	const map = useMemo(
		() => [
		{ name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
		{ name: Controls.back, keys: ["ArrowDown", "KeyS"] },
		{ name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
		{ name: Controls.right, keys: ["ArrowRight", "KeyD"] },
		{ name: Controls.jump, keys: ["Space"] }
		],
		[]
	)

	const { startGame, gameState, goToMenu, startBottleSpin, checkColorMatch } = useStore((state) => ({
		startGame: state.startGame,
		gameState: state.gameState,
		goToMenu: state.goToMenu,
		startBottleSpin: state.startBottleSpin,
		checkColorMatch: state.checkColorMatch
	}));

	const match = useRef(false);

	function handleStart() {	
			startBottleSpin();
			console.log(useStore.getState())
	}

	function handleRestart() {
		goToMenu();
	}

	useEffect(() =>
	{
		const unsubscribeGameOver = useStore.subscribe(
			(state) => state.gameState,
			(value) =>
			{
				if(value === gameStates.GAME_OVER)
				{
					match.current = checkColorMatch();
					console.log("gameOver.current", match.current)
				}
			}
		)
		return () =>
		{
			unsubscribeGameOver()
		}
	}, [])

	return (
		<>
		<KeyboardControls map={map}>
			{gameState === gameStates.GAME_OVER && match.current && <WinnerModal handleRestart={handleRestart} />}
			{gameState === gameStates.GAME_OVER && !match.current && <GameOverModal handleRestart={handleRestart} /> }
			{gameState === gameStates.MENU && <StartModal handleStart={handleStart} />}
			<Canvas shadows camera={{ position: [0, 5, 15], fov: 30 }}>
			<OrbitControls target={[0, 0, 0]} />
			<Stars />
			<WobblySpheres />
			<Environment
				files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
				resolution={1024}
			/>
			<Physics debug>
				<Game />
			</Physics>
			</Canvas>
		</KeyboardControls>
		</>
	)
}

export default App

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(500 * 3), { radius: 7 })
  )
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function WobblySpheres() {
  return (
    <>
      <Float>
        <mesh position={[1, -12, -15]} scale={[2, 2, 2]}>
          <sphereGeometry />
          <MeshDistortMaterial
            // opacity={0.8}
            // transparent
            distort={0.4}
            speed={4}
            roughness={0.2}
            color={"#F16B71"}
          />
        </mesh>
        {/* red */}
      </Float>
      <Float>
        <mesh scale={[1, 1, 1]} position={[5, 1, -18]}>
          <sphereGeometry />
          <MeshDistortMaterial
            // opacity={0.8}
            // transparent
            distort={0.2}
            speed={5}
            roughness={0.2}
            color="#A1F4C0"
          />
          {/* green */}
        </mesh>
      </Float>
      <Float>
        <mesh scale={[1.4, 1.4, 1.4]} position={[-5, -1, -11]}>
          <boxGeometry />
          <MeshWobbleMaterial
            // opacity={0.8}
            // transparent
            factor={1}
            speed={5}
            roughness={0.2}
            color={"#FFE076"}
          />
          {/* yellow */}
        </mesh>
      </Float>
    </>
  )
}
