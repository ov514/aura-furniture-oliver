import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <motion.div 
            className="page-container"
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem' }}>Get in Touch</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginTop: '10px' }}>Our dedicated team is ready to assist you with any inquiries.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                <motion.div className="glass-panel" initial={{ x: -50 }} animate={{ x: 0 }}>
                    <h3 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>Contact Information</h3>
                    
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(186, 159, 251, 0.1)', padding: '15px', borderRadius: '50%', color: '#ba9ffb' }}>
                            <MapPin />
                        </div>
                        <div>
                            <h4 style={{ margin: 0 }}>Showroom Location</h4>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)' }}>123 Design Avenue, NY 10001</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(186, 159, 251, 0.1)', padding: '15px', borderRadius: '50%', color: '#ba9ffb' }}>
                            <Phone />
                        </div>
                        <div>
                            <h4 style={{ margin: 0 }}>Phone</h4>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)' }}>+66 946350799</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(186, 159, 251, 0.1)', padding: '15px', borderRadius: '50%', color: '#ba9ffb' }}>
                            <Mail />
                        </div>
                        <div>
                            <h4 style={{ margin: 0 }}>Email</h4>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)' }}>hlaingbhonehtun@gmail.com</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="glass-panel" initial={{ x: 50 }} animate={{ x: 0 }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </div>
                        <input type="email" placeholder="Email Address" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    style={{ background: 'rgba(46, 213, 115, 0.2)', color: '#2ed573', padding: '16px', borderRadius: '15px', textAlign: 'center', fontWeight: 'bold' }}
                                >
                                    Message Sent Successfully!
                                </motion.div>
                            ) : (
                                <motion.button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <Send size={20} /> Send Message
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Contact;
