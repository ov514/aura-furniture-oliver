import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/');
        } catch (error) {
            alert('Registration Failed');
        }
    };

    return (
        <motion.div 
            className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
        >
            <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', textAlign: 'center', padding: '50px 40px' }}>
                <h2 className="text-gradient" style={{ marginBottom: '10px', fontSize: '2.5rem' }}>Join AURA</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>Experience premium furniture shopping.</p>
                
                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                        Create Account
                    </motion.button>
                </form>
                
                <p style={{ marginTop: '30px', color: 'rgba(255,255,255,0.5)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;
