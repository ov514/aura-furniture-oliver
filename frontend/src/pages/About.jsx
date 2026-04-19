import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: 'Sophia Laurent',
        location: 'Paris, France',
        rating: 5,
        text: 'AURA completely transformed my living room. The Modula Sofa is a masterpiece — the velvet finish and ergonomic design are beyond anything I have ever sat on. Worth every penny.',
        avatar: 'SL',
        accent: '#ba9ffb'
    },
    {
        name: 'James Thornton',
        location: 'London, UK',
        rating: 5,
        text: 'I bought the Eclipse Orbit Chair and I am obsessed. The quality of the leather and oak craftsmanship is extraordinary. My clients always comment on it during meetings.',
        avatar: 'JT',
        accent: '#7B9FFF'
    },
    {
        name: 'Yuki Nakamura',
        location: 'Tokyo, Japan',
        rating: 5,
        text: 'The custom furniture service was phenomenal. The team understood exactly what I needed for my minimalist space. Delivery was on time and packaging was impeccable.',
        avatar: 'YN',
        accent: '#FF9FD4'
    },
    {
        name: 'Marcus Webb',
        location: 'New York, USA',
        rating: 5,
        text: 'Ordered the Zenith Dining Table. It arrived in perfect condition and looks incredible in my apartment. The glass top on steel legs combination is everything I dreamed of.',
        avatar: 'MW',
        accent: '#9FFBBA'
    },
];

const StarRating = ({ rating }) => (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                fill={i < rating ? '#FFD700' : 'transparent'}
                color={i < rating ? '#FFD700' : 'rgba(255,255,255,0.3)'}
            />
        ))}
    </div>
);

const About = () => {
    const [activeReview, setActiveReview] = useState(null);

    return (
        <motion.div 
            className="page-container"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
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

            {/* Customer Reviews Section */}
            <motion.div
                style={{ marginTop: '100px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>What Our Clients Say</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>Real experiences from our premium customers worldwide</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="glass-panel"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveReview(activeReview === index ? null : index)}
                            style={{ cursor: 'pointer', borderColor: activeReview === index ? `${review.accent}55` : undefined }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${review.accent}44, ${review.accent}22)`,
                                    border: `2px solid ${review.accent}55`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '700', fontSize: '0.9rem', color: review.accent, flexShrink: 0
                                }}>
                                    {review.avatar}
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', margin: 0 }}>{review.name}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>{review.location}</p>
                                </div>
                            </div>
                            <StarRating rating={review.rating} />
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
                                "{review.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Aggregate rating summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: 'center', marginTop: '50px', padding: '30px',
                        background: 'rgba(186, 159, 251, 0.05)',
                        border: '1px solid rgba(186, 159, 251, 0.15)',
                        borderRadius: '20px'
                    }}
                >
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#FFD700', lineHeight: 1 }}>5.0</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '10px 0' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#FFD700" color="#FFD700" />)}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>Average rating from 2,400+ verified customers</p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;

