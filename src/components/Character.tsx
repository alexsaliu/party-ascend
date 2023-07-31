import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/girl.glb");
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null} scale={[.5, .5, .5]}>
      <group name="Scene">
        <group name="HumanArmature">
          <group name="Female">
            <skinnedMesh
              name="Cylinder012"
              geometry={nodes.Cylinder012.geometry}
              material={materials.Skin}
              skeleton={nodes.Cylinder012.skeleton}
            />
            <skinnedMesh
              name="Cylinder012_1"
              geometry={nodes.Cylinder012_1.geometry}
              material={materials.Eyes}
              skeleton={nodes.Cylinder012_1.skeleton}
            />
            <skinnedMesh
              name="Cylinder012_2"
              geometry={nodes.Cylinder012_2.geometry}
              material={materials.Hair}
              skeleton={nodes.Cylinder012_2.skeleton}
            />
            <skinnedMesh
              name="Cylinder012_3"
              geometry={nodes.Cylinder012_3.geometry}
              material={materials.Dress}
              skeleton={nodes.Cylinder012_3.skeleton}
            />
            <skinnedMesh
              name="Cylinder012_4"
              geometry={nodes.Cylinder012_4.geometry}
              material={materials.Shoes}
              skeleton={nodes.Cylinder012_4.skeleton}
            />
          </group>
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/girl.glb");