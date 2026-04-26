import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Ruler, Palette, Calendar, CheckCircle } from 'lucide-react';
import API from '../api';

const roomTypes = ['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Kitchen', 'Outdoor', 'Other'];
const styles = ['Modern Minimalist', 'Dark Luxury', 'Scandinavian', 'Industrial', 'Mid-Century Modern', 'Bohemian', 'Contemporary'];
const budgets = ['Under $500', '$500 – $1,000', '$1,000 – $3,000', '$3,000 – $7,000', '$7,000+'];

const Custom = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        room: '', style: '', budget: '',
        dimensions: '', description: '', date: ''
    });

    const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await API.post('/custom-orders', form);
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(186,159,251,0.1)', border: '1px solid rgba(186,159,251,0.3)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px' }}
                >
                    <Sparkles size={14} color="#ba9ffb" />
                    <span style={{ fontSize: '0.85rem', color: '#ba9ffb', fontWeight: '600' }}>FREE CONSULTATION INCLUDED</span>
                </motion.div>
                <motion.h1
                    className="text-gradient"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '16px' }}
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                >
                    Design Your Dream Piece
                </motion.h1>
                <motion.p
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                >
                    Tell us your vision and our master craftsmen will bring it to life. Every custom order includes a free 1-on-1 design consultation.
                </motion.p>
            </div>

            {/* Feature cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                {[
                    { icon: <Ruler size={22} color="#ba9ffb" />, title: 'Any Dimensions', desc: 'Perfectly fit any space, no matter the size or shape.' },
                    { icon: <Palette size={22} color="#7B9FFF" />, title: 'Your Style', desc: 'Choose from hundreds of fabrics, woods, metals and finishes.' },
                    { icon: <Calendar size={22} color="#FF9FD4" />, title: 'Free Consult', desc: 'A dedicated designer works with you from start to finish.' },
                ].map((f, i) => (
                    <motion.div
                        key={i} className="glass-panel"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                        style={{ textAlign: 'center', padding: '28px 20px' }}
                    >
                        <div style={{ marginBottom: '12px' }}>{f.icon}</div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>{f.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel"
                        style={{ textAlign: 'center', padding: '60px 40px', maxWidth: '500px', margin: '0 auto' }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
                        >
                            <CheckCircle size={60} color="#2ed573" />
                        </motion.div>
                        <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '16px' }}>Request Received!</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '30px' }}>
                            Thank you, <strong style={{ color: 'white' }}>{form.name}</strong>! Our design team will reach out to <strong style={{ color: '#ba9ffb' }}>{form.email}</strong> within 24 hours to schedule your free consultation.
                        </p>
                        <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another Request</button>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ padding: '40px' }}>
                        <h2 style={{ marginBottom: '30px', fontSize: '1.6rem' }}>Custom Order & Consultation Form</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Personal Info */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Full Name *</label>
                                    <input type="text" placeholder="Your Name" required value={form.name} onChange={e => updateForm('name', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Email Address *</label>
                                    <input type="email" placeholder="your@email.com" required value={form.email} onChange={e => updateForm('email', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Phone Number</label>
                                    <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
                                </div>
                            </div>

                            {/* Room & Style */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Room Type *</label>
                                    <select
                                        required value={form.room} onChange={e => updateForm('room', e.target.value)}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: form.room ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="" disabled>Select room type</option>
                                        {roomTypes.map(r => <option key={r} value={r} style={{ background: '#1a1a2e' }}>{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Design Style *</label>
                                    <select
                                        required value={form.style} onChange={e => updateForm('style', e.target.value)}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: form.style ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="" disabled>Select style</option>
                                        {styles.map(s => <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Budget Range *</label>
                                    <select
                                        required value={form.budget} onChange={e => updateForm('budget', e.target.value)}
                                        style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: form.budget ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="" disabled>Select budget</option>
                                        {budgets.map(b => <option key={b} value={b} style={{ background: '#1a1a2e' }}>{b}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Dimensions & Preferred Date */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Dimensions (W × H × D)</label>
                                    <input type="text" placeholder='e.g. 200cm × 80cm × 90cm' value={form.dimensions} onChange={e => updateForm('dimensions', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Preferred Consultation Date</label>
                                    <input type="date" value={form.date} onChange={e => updateForm('date', e.target.value)}
                                        style={{ colorScheme: 'dark' }} />
                                </div>
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Describe Your Vision *</label>
                                <textarea
                                    rows={5} required
                                    placeholder="Tell us about your dream furniture piece — materials, colors, functionality, references, or anything else that inspires you..."
                                    value={form.description} onChange={e => updateForm('description', e.target.value)}
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}

                            <motion.button
                                type="submit" className="btn-primary"
                                disabled={loading}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem', padding: '18px', opacity: loading ? 0.7 : 1 }}
                                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                            >
                                <Sparkles size={20} />
                                {loading ? 'Submitting...' : 'Submit Custom Request & Book Free Consultation'}
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Custom;
