import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { SPIRAL_X, SPIRAL_Z, isInsideCircle } from './utils';

const TURQ = '#66D7D1';
const PURP = '#D0BCD5';
const BLUE = '#416788';
const BLACK = '#070707';
const STEEL = '#4381C1';
const colors = [BLUE, TURQ, PURP, BLACK, STEEL];

function RollingBox({ onRemove, currIndex, ...props }) {
  const mesh = useRef();
  const isRemoved = useRef(false);
  const { scene } = useThree();
  const color = colors[Math.floor(Math.random() * colors.length)];
  const index = useRef(currIndex);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.set(-time * 4, -time, 0);

    const { x, z } = mesh.current.position;

    if (isInsideCircle(x, z, 150)) {
      if (!isRemoved.current) {
        onRemove();
      }
      scene.remove(mesh.current);
      scene.matrixWorldNeedsUpdate = true;
      scene.updateMatrix();
      isRemoved.current = true;
      return;
    }
    index.current -= 1;
    mesh.current.position.x = SPIRAL_X(index.current) * 60;
    mesh.current.position.z = SPIRAL_Z(index.current) * 60;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[20, 20, 20]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function RollingBoxes({ boxController }) {
  const numBoxes = boxController.getNumRollingBoxes();
  const rollingBoxes = useRef(
    new Array(numBoxes).fill().map((_entry, index) => {
      const coordinate = index + numBoxes;
      return (
        <RollingBox
          onRemove={() => {
            boxController.decrementNumHelixBoxes();
          }}
          // eslint-disable-next-line react/no-array-index-key
          key={`boxes_right_${index}`}
          currIndex={coordinate}
          position={[
            SPIRAL_X(coordinate) * 60,
            -300,
            SPIRAL_Z(coordinate) * 60,
          ]}
        />
      );
    }),
  );

  return rollingBoxes.current;
}
