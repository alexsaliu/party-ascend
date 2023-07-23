
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";

export default function Bottle(props) {
    const { nodes } = useGLTF("/models/bottle.glb");
    const bottle = useRef();
    // useFrame(({_state, delta}) => {
    //     if(_state){ // to avoid warnings
    //     }
    //     bottle.current.rotation.z += delta;
    // });
    return (
        <group {...props} dispose={null}>
            <mesh
                // ref={bottle}
                castShadow
                receiveShadow
                geometry={nodes.Object_3.geometry}
                // material={materials.Default}
            >
                <MeshTransmissionMaterial samples={16} resolution={512} anisotropy={1} thickness={0.1} roughness={0} toneMapped={true} color={'green'}/>
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/bottle.glb");
