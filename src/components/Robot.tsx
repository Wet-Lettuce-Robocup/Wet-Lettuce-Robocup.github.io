import NavBar from "./NavBar.tsx";
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
    const { scene } = useGLTF('/models/pcbv2.glb');
    return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

function Robot() {
    return (
        <>
            <NavBar />
            <main>
                <h1>Robot</h1>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />

                        {/*<directionalLight position={[10, 10, 5]} intensity={2} />*/}

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
