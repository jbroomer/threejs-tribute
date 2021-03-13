import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Camera({ boxController, ...props }) {
  const ref = useRef();
  const {
    setDefaultCamera,
    camera,
    gl: { domElement },
  } = useThree();

  const controls = new OrbitControls(camera, domElement);
  controls.maxDistance = 1600;
  controls.minDistance = -1500;
  if (boxController.getNumHelixBoxes() > 0) {
    camera.position.set(0, 1463.7281168297059, 0);
  }
  // Make the camera known to the system
  useEffect(() => setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => {
    controls.enabled = boxController.cameraControlsEnabled();
    const { y, z } = camera.position;
    if (boxController.getNumHelixBoxes() < 25 && boxController.getNumHelixBoxes() > 0) {
      camera.position.set(0, y > 400 ? y - 2 : y, z < 1450 ? z + 2 : z);
    }
    controls.autoRotate = true;
    ref.current.updateMatrixWorld();
    controls.update();
  });
  return <perspectiveCamera ref={ref} {...props} />;
}
