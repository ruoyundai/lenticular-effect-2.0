
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import IridescentSurface from './components/IridescentSurface';
import * as THREE from 'three';

const App: React.FC = () => {
  // Preserved tuned parameters
  const [intensity] = useState(0);
  const [speed] = useState(0.03);
  const [grain] = useState(0.5);
  const [grainSize] = useState(30.0);
  const [brightness] = useState(5);
  const [flowShape] = useState(0.3);
  const [pixelation] = useState(0); 
  const [colors] = useState([
    '#ff3366', // Pinkish Red
    '#33ffcc', // Aquamarine
    '#3366ff', // Royal Blue
    '#ffff33', // Neon Yellow
    '#ff33ff'  // Fuchsia
  ]);
  const [colorWeights] = useState([1.0, 1.0, 1.0, 1.0, 1.0]);
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5));

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    setMouse(new THREE.Vector2(
      e.clientX / window.innerWidth,
      1.0 - (e.clientY / window.innerHeight)
    ));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas 
          camera={{ position: [0, 0, 1], fov: 45 }}
          gl={{ antialias: true, alpha: false, stencil: false, depth: false }}
          className="w-full h-full"
        >
          <IridescentSurface 
            intensity={intensity} 
            speed={speed} 
            grain={grain}
            grainSize={grainSize}
            brightness={brightness}
            flowShape={flowShape}
            pixelation={pixelation}
            colors={colors}
            colorWeights={colorWeights}
            mouse={mouse}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
