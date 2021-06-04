import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function Responsive() {
  const wrapper = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    if (!wrapper || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect =
          canvas.current.clientWidth / canvas.current.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    };

    animate();
  }, [wrapper, canvas]);

  return (
    <div
      ref={wrapper}
      style={{
        width: 500,
        height: 500,
        resize: 'both',
        overflow: 'auto',
      }}
    >
      <canvas
        ref={canvas}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default Responsive;
