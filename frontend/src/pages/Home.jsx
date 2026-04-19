import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdvancedSculpture = () => {
    return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
            <group position={[3, 0, 0]}>
                {/* Core Abstract Floating Element */}
                <mesh castShadow receiveShadow>
                    <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
                    {/* High-end glass/metal physical material */}
                    <meshPhysicalMaterial 
                        color="#ba9ffb" 
                        roughness={0.1} 
                        metalness={0.8}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        transmission={0.5} // adds glass-like transparency
                        ior={1.5}
                        thickness={0.5}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Floating smaller geometric orbits */}
                <mesh position={[2, 2, 1]}>
                    <icosahedronGeometry args={[0.5, 0]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                
                <mesh position={[-2, -2, -1]}>
                    <octahedronGeometry args={[0.4, 0]} />
                    <meshStandardMaterial color="#6432c8" emissive="#6432c8" emissiveIntensity={1} />
                </mesh>

                {/* Magical Sparkles Particle System */}
                <Sparkles count={150} scale={8} size={2} speed={0.4} color="#ba9ffb" opacity={0.6} />
            </group>
        </Float>
    );
};

const ShowroomScene = () => {
    return (
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
            <color attach="background" args={['#050508']} />
            <ambientLight intensity={0.2} />
            <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3} castShadow color="#ffffff" />
            <pointLight position={[-5, 0, -5]} intensity={2} color="#ba9ffb" />

            <Suspense fallback={null}>
                <Environment preset="night" />
                <AdvancedSculpture />
                <ContactShadows position={[3, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#ba9ffb" />
                
                {/* Post-Processing for Glowing Bloom effects */}
                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} />
                </EffectComposer>
            </Suspense>

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -60 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
            <div className="canvas-container">
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
                    <color attach="background" args={['#050508']} />
                    <ambientLight intensity={0.2} />
                    <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3} castShadow color="#ffffff" />
                    <pointLight position={[-5, 0, -5]} intensity={2} color="#ba9ffb" />

                    <Suspense fallback={null}>
                        <Environment preset="night" />
                        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
                            <group position={isMobile ? [0, 1.5, 0] : [3, 0, 0]}>
                                <mesh castShadow receiveShadow>
                                    <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
                                    <meshPhysicalMaterial 
                                        color="#ba9ffb" 
                                        roughness={0.1} 
                                        metalness={0.8}
                                        clearcoat={1}
                                        clearcoatRoughness={0.1}
                                        transmission={0.5}
                                        ior={1.5}
                                        thickness={0.5}
                                        envMapIntensity={2}
                                    />
                                </mesh>
                                <mesh position={[2, 2, 1]}>
                                    <icosahedronGeometry args={[0.5, 0]} />
                                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                                </mesh>
                                <mesh position={[-2, -2, -1]}>
                                    <octahedronGeometry args={[0.4, 0]} />
                                    <meshStandardMaterial color="#6432c8" emissive="#6432c8" emissiveIntensity={1} />
                                </mesh>
                                <Sparkles count={150} scale={8} size={2} speed={0.4} color="#ba9ffb" opacity={0.6} />
                            </group>
                        </Float>
                        <ContactShadows position={isMobile ? [0, -1, 0] : [3, -2.5, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#ba9ffb" />
                        <EffectComposer disableNormalPass>
                            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} />
                        </EffectComposer>
                    </Suspense>
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
            
            <div className="hero-overlay">
                <motion.h1 
                    className="text-gradient"
                    initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                >
                    Redefine<br/>Your Space.
                </motion.h1>
                <motion.p
                    initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                >
                    Immerse yourself in an ultra-premium visual experience. Discover architectural masterpieces directly in a modern digital dimension.
                </motion.p>
                <motion.div 
                    className="actions"
                    initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                >
                    <button className="btn-primary" onClick={() => navigate('/products')}>Explore Collection</button>
                    <button className="btn-outline" onClick={() => navigate('/about')}>Our Story</button>
                </motion.div>
            </div>
            
            <motion.div 
                style={{ position: 'absolute', bottom: '40px', left: isMobile ? '50%' : '8%', transform: isMobile ? 'translateX(-50%)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            >
                <div style={{ fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>SCROLL</div>
                <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, white, transparent)' }}></div>
            </motion.div>
        </motion.div>
    );
};

export default Home;
