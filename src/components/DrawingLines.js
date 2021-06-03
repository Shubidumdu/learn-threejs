import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function SpinningBox() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref) return;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    ref.current.append(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);

    return () => {};
  }, [ref]);

  return <div ref={ref}></div>;
}

export default SpinningBox;
