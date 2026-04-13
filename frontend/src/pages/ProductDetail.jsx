import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import API from '../api';

const ModelViewer = ({ color, type }) => {
    return (
        <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 10, 5]} intensity={2.5} castShadow />
            <Environment preset="studio" />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh castShadow receiveShadow position={[0,0,0]}>
                    {type === 'Box' ? <boxGeometry args={[3, 1, 1.5]} /> : <cylinderGeometry args={[1, 1, 2, 32]} />}
                    <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
                </mesh>
            </Float>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} />
            <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Canvas>
    );
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [activeColor, setActiveColor] = useState('');
    const [activeMat, setActiveMat] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
                if (data.color && data.color.length > 0) setActiveColor(data.color[0]);
                if (data.material && data.material.length > 0) setActiveMat(data.material[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="page-container" style={{ textAlign: 'center' }}>Loading details...</div>;
    }

    return (
        <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', marginBottom: '30px', borderRadius: '30px' }} onClick={() => navigate('/products')}>
                <ArrowLeft size={18} /> Back to Showroom
            </button>

            <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <motion.div className="glass-panel" style={{ height: 'min(500px, 70vh)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
                    <ModelViewer color={activeColor || '#ffffff'} type={product.category === 'Dining' ? 'Cylinder' : 'Box'} />
                </motion.div>

                <motion.div initial={{ x: 50 }} animate={{ x: 0 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                        <h1 className="text-gradient" style={{ margin: 0 }}>{product.name}</h1>
                        <span style={{ padding: '5px 15px', background: 'var(--glass-bg)', border: '1px solid var(--accent-color)', borderRadius: '20px', fontSize: '0.9rem' }}>{product.category}</span>
                    </div>
                    <div style={{ fontSize: '2rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '30px' }}>
                        ${product.price.toFixed(2)}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
                        {product.description}
                    </p>

                    {product.material && product.material.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <h4 style={{ marginBottom: '15px', color: 'rgba(255,255,255,0.8)' }}>Select Material</h4>
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                {product.material.map(mat => (
                                    <button key={mat} onClick={() => setActiveMat(mat)} className="btn-outline" style={{ padding: '10px 20px', background: activeMat === mat ? 'var(--glass-bg)' : 'transparent', borderColor: activeMat === mat ? 'var(--accent-color)' : 'var(--glass-border)' }}>
                                        {mat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.color && product.color.length > 0 && (
                        <div style={{ marginBottom: '40px' }}>
                            <h4 style={{ marginBottom: '15px', color: 'rgba(255,255,255,0.8)' }}>Select Finish</h4>
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                {product.color.map(col => (
                                    <motion.div key={col} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveColor(col)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: col, cursor: 'pointer', border: `3px solid ${activeColor === col ? 'white' : 'transparent'}`, boxShadow: activeColor === col ? `0 0 15px ${col}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {activeColor === col && <Check size={20} color={['#ffffff','#ffffff'].includes(col) ? '#000' : '#fff'} />}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '1.2rem', padding: '20px' }} onClick={() => addToCart({...product, name: `${product.name} (${activeColor})`}, 1)}>
                        <ShoppingBag /> Add to Cart
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;
