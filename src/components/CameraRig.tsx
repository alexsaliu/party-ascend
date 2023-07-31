import React, {forwardRef, useEffect, useState, useRef} from "react"
import { CameraControls, Html } from "@react-three/drei"
import * as THREE from 'three'
import { useStore, gameStates } from "../store.ts"

const CameraRig = forwardRef(({props}, ref) => {
	
	const cameraControlsRef = useRef()

	useEffect(() =>
    {
		const data = {
			vec6: { value: [-2, 0, 0], label: 'posA' },
			vec7: { value: [1, 1, 0], label: 'tgtA' },
			vec8: { value: [0, 2, 5], label: 'posB' },
			vec9: { value: [-1, 0, 0], label: 'tgtB' },
		}
		const unsubscribeSpinBottle = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.BOTTLESPIN)
                {
                    cameraControlsRef?.current?.moveTo(0, 0, 0, true)
					cameraControlsRef.current. lerpLookAt(
						0, 5, 15, // positionAX, positionAY, positionAZ
						0, 0, 0, // targetAX, targetAY, targetAZ
						0, 5, 0, // positionBX, positionBY, positionBZ
						0, 0, 0, // targetBX, targetBY, targetBZ
						0.5, // t (interpolation factor, range 0 to 1)
						true // enableTransition
					);
                }
            }
        )
        const unsubscribeSpinPlatform = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.PLATFORMSPIN)
                {
                    cameraControlsRef.current.moveTo(0,0,0, true)
				
                }
            }
        )
		const unsubscribeGameReady = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.GAME)
                {
                    cameraControlsRef.current.moveTo(0,0,-2, true)
					cameraControlsRef.current. lerpLookAt(
						0, 5, 0, // positionAX, positionAY, positionAZ
						0, 0, 0, // targetAX, targetAY, targetAZ
						0, 1, 20, // positionBX, positionBY, positionBZ
						0, 0, 0, // targetBX, targetBY, targetBZ
						0.5, // t (interpolation factor, range 0 to 1)
						true // enableTransition
					);
                }
            }
        )
		const unsubscribeGameOver = useStore.subscribe(
            (state) => state.gameState,
            (value) =>
            {
                if(value === gameStates.GAME_OVER)
                {
                    cameraControlsRef.current.moveTo(0, 0, 0, true)
                }
            }
        )
		
        return () =>
        {
			unsubscribeSpinPlatform()
			unsubscribeSpinBottle()
			unsubscribeGameReady()
			unsubscribeGameOver()
        }
    }, [])

	return <>
		<CameraControls ref={cameraControlsRef} />
	</>
})

export default CameraRig