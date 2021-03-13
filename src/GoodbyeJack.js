import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import Roboto from './Roboto.json';

export default function TextMesh({ boxController }) {
  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(Roboto);
  const ref = useRef();
  // configure font geometry
  const textOptions = {
    font,
    size: 100,
    height: 30,
  };

  useFrame(() => {
    if (boxController.getNumHelixBoxes() === 0) {
      ref.current.visible = true;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} position={[-500, -450, 0]}>
      <textGeometry
        attach="geometry"
        args={['Good Luck, Jack!', textOptions]}
      />
      <meshStandardMaterial attach="material" color="black" />
    </mesh>
  );
}
