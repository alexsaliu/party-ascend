
import React, { useState } from 'react'
import {
    CuboidCollider,
    CylinderCollider,
    Physics,
    RigidBody,
    RigidBodyProps
  } from "@react-three/rapier";
import SpinnerPlatform from "./SpinnerPlatform";

export default function PieCollider(props: any) {
    return (
        <>
         
        {/* <CylinderCollider args={[.1, 5]} > */}
            <SpinnerPlatform scale={[.24, .24, .24]} position-y={.1}/>
        {/* </CylinderCollider> */}
        </>
       
    )
}
