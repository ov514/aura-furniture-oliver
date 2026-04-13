import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockData = [
    {
        _id: '1', name: 'AURA Modula Sofa', price: 1899.00,
        description: 'Ultra-premium velvet modular sofa designed for uncompromising comfort and dark luxury aesthetics.',
        category: 'Living Room', images: ['/assets/sofa.png'],
        colors: ['#2d2d2d', '#ba9ffb', '#ffffff'], materials: ['Velvet', 'Leather']
    },
    {
        _id: '2', name: 'Eclipse Orbit Chair', price: 899.00,
        description: 'A sculptural statement piece masterfully crafted from curved oak and top-grain black leather.',
        category: 'Living Room', images: ['/assets/chair.png'],
        colors: ['#000000', '#5a3d31'], materials: ['Oak + Leather', 'Walnut + Fabric']
    },
    {
        _id: '3', name: 'Zenith Dining Table', price: 1499.00,
        description: 'Immaculate thick glass top hovering above heavy, sculptural matte black steel legs.',
        category: 'Dining', images: ['/assets/table.png'],
        colors: ['#000000'], materials: ['Glass + Steel', 'Marble + Steel']
    },
    {
        _id: '4', name: 'Lumina Arch Lamp', price: 349.00,
        description: 'Minimalist floor lamp providing warm, cinematic lighting to any corner of your space.',
        category: 'Decor', images: ['/assets/logo.png'], // fallback
        colors: ['#ffd700', '#c0c0c0'], materials: ['Brass', 'Steel']
    }
];

const Products = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(mockData);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts(mockData);
            }
        };
        fetchProducts();
    }, []);

    return (
        <motion.div 
            className="page-container"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <motion.h1 className="text-gradient" initial={{ y: -20 }} animate={{ y: 0 }}>The Collection</motion.h1>
                <motion.p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '10px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    Curated architectural masterpieces to elevate your living space.
                </motion.p>
            </div>
            
            <motion.div 
                className="products-grid"
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {products.map((product) => (
                    <motion.div 
                        key={product._id} 
                        className="glass-panel product-card"
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <div 
                            className="product-image" 
                            style={{ backgroundImage: `url(${product.images[0]})` }}
                        >
                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--glass-bg)', padding: '5px 12px', borderRadius: '20px', backdropFilter: 'blur(10px)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {product.category.toUpperCase()}
                            </div>
                        </div>
                        
                        <div className="product-info">
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{product.name}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.5', minHeight: '40px' }}>
                                {product.description}
                            </p>
                            
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                {product.color?.map(col => (
                                    <div key={col} className="swatch" style={{ background: col, width: '16px', height: '16px', borderRadius: '50%' }} title="Available Color"></div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <div style={{ fontSize: '1.4rem', color: 'var(--accent-color)', fontWeight: '800' }}>
                                    ${product.price.toFixed(2)}
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn-outline" style={{ padding: '10px', borderRadius: '50%' }} onClick={() => navigate(`/product/${product._id}`)} title="View Details">
                                        <Eye size={18} />
                                    </button>
                                    <button className="btn-primary" style={{ padding: '10px', borderRadius: '50%' }} onClick={() => addToCart(product, 1)} title="Add to Cart">
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Products;
