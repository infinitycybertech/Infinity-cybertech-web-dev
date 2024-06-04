import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader"

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("./old_computers/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2.15} groundColor="white" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={20}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={20} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 3}
        position={isMobile ? [0, -3, -2.2] : [0, -4.25, -1.5]}
        rotation={[0, -4.55*Math.PI/3,0]}
      />
    </mesh>
  );
};

const DesktopCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <div style={{width: '100vw', height: '100vh'}}>
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Computers isMobile={isMobile} />
          </Suspense>
          <Preload all />
        </Canvas>
        </div>
      )}
    </>
  );
};

export default DesktopCanvas;
