import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import Camera from './Camera';
import RollingBoxes from './RollingBox';
import Helix from './Helix';
import HelixStrands from './HelixStrands';
import GoodbyeJack from './GoodbyeJack';
import './App.css';

class BoxController {
  constructor(numHelixBoxes) {
    this.numHelixBoxes = numHelixBoxes;
    this.numRollingBoxes = 800;
    this.ratio = 1 / (this.numRollingBoxes / numHelixBoxes);
  }

  getNumHelixBoxes() {
    return this.numHelixBoxes;
  }

  decrementNumHelixBoxes() {
    this.numHelixBoxes -= this.ratio;
  }

  getNumRollingBoxes() {
    return this.numRollingBoxes;
  }

  cameraControlsEnabled() {
    return this.numHelixBoxes === 0;
  }
}

const boxController = new BoxController(25);

function App() {
  const [play, setPlay] = useState(false);

  return play ? (
    <Canvas gl={{ antialias: true, alpha: true }}>
      <Camera position={[0, 200, 1450]} boxController={boxController} />
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={1} />
      <RollingBoxes boxController={boxController} />
      <Helix boxController={boxController} />
      <HelixStrands boxController={boxController} />
      <GoodbyeJack boxController={boxController} />
    </Canvas>
  ) : (
    // eslint-disable-next-line react/button-has-type
    <button
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '115px',
        height: '50px',
        borderRadius: '15px',
        fontFamily: 'monospace',
        fontSize: 'x-large',
      }}
      onClick={() => setPlay(true)}
    >
      Play
    </button>
  );
}

export default App;
