import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { NEXT_X, NEXT_Z } from './utils';

const YELLOW = '#E1c013';
const RED = '#Eb0c0a';
const GREEN = '#5ddd2b';
const BLUE = '#46bbff';

const colorsPerLevel = {
  1: BLUE,
  3: RED,
  5: GREEN,
  7: BLUE,
  9: YELLOW,
  11: GREEN,
  13: BLUE,
  15: RED,
  17: YELLOW,
  19: RED,
  21: GREEN,
  23: YELLOW,
};

function HelixStrand({ boxController, color, ...props }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.visible = boxController.getNumHelixBoxes() === 0;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.set(-time * 4, -time, 0);
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function RollingBoxes({ boxController }) {
  const radius = 100;
  const objPerTurn = 25;
  const angleStep = (Math.PI * 2) / objPerTurn;
  const heightStep = 30;

  const helixStrands = [];

  for (let currLevel = 0; currLevel < 25; currLevel += 1) {
    if (currLevel % 2 === 1) {
      let currX1 = Math.cos(angleStep * currLevel) * radius;
      let currZ1 = Math.sin(angleStep * currLevel) * radius;
      const currX2 = Math.cos(angleStep * currLevel + Math.PI) * radius;
      const currZ2 = Math.sin(angleStep * currLevel + Math.PI) * radius;

      const slope = (currZ2 - currZ1) / (currX2 - currX1);

      const updateX = () => {
        if (currLevel > 5 && currLevel < 19) {
          currX1 += NEXT_X(slope) * 40;
        } else {
          currX1 -= NEXT_X(slope) * 40;
        }
      };
      const updateZ = () => {
        if (currLevel > 5 && currLevel < 19) {
          currZ1 += NEXT_Z(slope) * 40;
        } else {
          currZ1 -= NEXT_Z(slope) * 40;
        }
      };

      for (let i = 0; i < 4; i += 1) {
        updateX();
        updateZ();
        helixStrands.push(
          <HelixStrand
            position={[
              (currX1),
              -300 + heightStep * currLevel,
              (currZ1),
            ]}
            boxController={boxController}
            color={colorsPerLevel[currLevel]}
          />,
        );
      }
    }
  }
  return helixStrands;
}
