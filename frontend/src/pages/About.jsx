import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div 
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
                <motion.h1 
                    className="text-gradient" 
                    style={{ fontSize: '4rem', marginBottom: '30px' }}
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Designing The Future
                </motion.h1>
                <motion.p 
                    style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '50px' }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    AURA was founded on a simple principle: furniture should not only fill a space, but redefine it. 
                    We blend cutting-edge 3D visualization technology with world-class minimalist design to bring the 
                    showroom directly into your home. Every piece is crafted with sustainable, ultra-premium materials 
                    designed to last generations.
                </motion.p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '60px' }}>
                <motion.div className="glass-panel" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
                    <h3>Our Vision</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '15px' }}>To become the global standard for digital luxury retail, seamlessly merging physical comfort with digital exploration.</p>
                </motion.div>
                <motion.div className="glass-panel" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
                    <h3>Sustainability</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '15px' }}>We utilize recycled metals, ethically sourced woods, and zero-emission manufacturing processes.</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
