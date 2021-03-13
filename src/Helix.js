import React, { useState, useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const colors = ['black', 'black'];

export default function Boxes({ boxController }) {
  const radius = 100;
  const turns = 1;
  const objPerTurn = 25;
  const angleStep = (Math.PI * 2) / objPerTurn;
  const heightStep = 30;

  const [hovered, set] = useState();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(240)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i % 2]).toArray()),
      ),
    [],
  );

  const ref = useRef();

  useFrame((state) => {
    let id = 0;
    const time = state.clock.getElapsedTime();
    const setObjectPosition = (x, y, z) => {
      tempObject.position.set(x, y, z);
      const scale = id === hovered ? 2 : 1;
      tempObject.scale.set(scale, scale, scale);
      tempObject.updateMatrix();
      if (!hovered) {
        tempObject.rotation.set(time, time, time);
      }
      ref.current?.setMatrixAt(id, tempObject.matrix);
      id += 1;
    };
    for (
      let box = 0;
      box < turns * objPerTurn - boxController.getNumHelixBoxes();
      box += 1
    ) {
      setObjectPosition(
        Math.cos(angleStep * box) * radius,
        -300 + heightStep * box,
        Math.sin(angleStep * box) * radius,
      );
      setObjectPosition(
        Math.cos(angleStep * box + Math.PI) * radius,
        -300 + heightStep * box,
        Math.sin(angleStep * box + Math.PI) * radius,
      );
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={ref}
      args={[null, null, 240]}
      onPointerMove={(e) => set(e.instanceId)}
      onPointerOut={() => set(undefined)}
    >
      <boxBufferGeometry attach="geometry" args={[20, 20, 20]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshBasicMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  );
}
