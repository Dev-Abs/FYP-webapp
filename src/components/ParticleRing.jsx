// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Sphere } from "@react-three/drei";
// import { pointsInner, pointsOuter } from "./utils";

// const ParticleRing = () => {
//   return (
//     <div className="absolute inset-0 h-full w-full">
//       <Canvas
//         camera={{
//           position: [15, -5, -5],
//         }}
//         style={{
//           height: "100%",
//           background: "radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)",
//         }}
//       >
//         <OrbitControls 
//           maxDistance={25} 
//           minDistance={15} 
//           enableZoom={false}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//         <ambientLight intensity={0.5} />
//         <pointLight position={[-20, 5, -15]} intensity={2} color="#4f46e5" />
//         <PointCircle />
//       </Canvas>
//     </div>
//   );
// };

// // Rest of ParticleRing component remains the same...

// const PointCircle = () => {
//   const ref = useRef(null);

//   useFrame(({ clock }) => {
//     if (ref.current?.rotation) {
//       ref.current.rotation.z = clock.getElapsedTime() * 0.05;
//     }
//   });

//   return (
//     <group ref={ref}>
//       {pointsInner.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//       {pointsOuter.map((point) => (
//         <Point key={point.idx} position={point.position} color={point.color} />
//       ))}
//     </group>
//   );
// };

// const Point = ({ position, color }) => {
//   return (
//     <Sphere position={position} args={[0.1, 10, 10]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };

// export default ParticleRing;

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils";

const ParticleRing = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [15, -5, -5] }}
        style={{
          height: "100%",
          background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        }}
      >
        <OrbitControls 
          maxDistance={25} 
          minDistance={15} 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
        <ambientLight intensity={0.2} />
        <pointLight position={[-20, 5, -15]} intensity={1.5} color="#4f46e5" />
        <PointCircle />
      </Canvas>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.03;
  });
  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.3}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;