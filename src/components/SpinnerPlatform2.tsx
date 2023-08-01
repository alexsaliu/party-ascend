// @ts-nocheck

import React, { useRef } from "react"
import Stadium from "./Stadium"
import PieMeshes from "./PieMeshes"
import Rings from "./Rings"
import Counter from "./Counter"
import PieColliders from "./PieColliders"
import Barrier from "./Barrier"

export default function SpinnerPlatform2(props) {
  // const group = useRef();

  return (
    <>
      <Barrier />
      {/* <PieColliders /> */}
      <Counter />
      <Rings />
      <Stadium />
      <PieMeshes />
    </>
  )
}
