import NavBar from "./NavBar.tsx";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
    const { scene } = useGLTF('/models/pcbv2.glb');
    return <primitive object={scene} scale={15} position={[0, 0, 0]} />;
}

function Robot() {
    return (
        <>
            <NavBar />
            <main>
                <h1>Robot</h1>
                <div style={{ width: '100%', height: '100vh'}}>
                    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                        <Environment preset="city" />
                        <hemisphereLight
                            args={["#ffffff", "#bbbbbb", 1.0]}
                        />
                        <directionalLight position={[0, -10, 0]} intensity={0.8} />

                        <Suspense fallback={null}>
                            <Model />
                        </Suspense>

                        <OrbitControls enableZoom={true} />
                    </Canvas>
                </div>
            </main>
        </>
    )
}

export default Robot;
