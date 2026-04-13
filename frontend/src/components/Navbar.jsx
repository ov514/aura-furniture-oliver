import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const cartCount = cart?.cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;

    const NavLinks = ({ isMobile = false }) => (
        <>
            <Link to="/" style={{ color: location.pathname === '/' ? '#ba9ffb' : '' }}>Home</Link>
            <Link to="/products" style={{ color: location.pathname === '/products' ? '#ba9ffb' : '' }}>Showroom</Link>
            <Link to="/about" style={{ color: location.pathname === '/about' ? '#ba9ffb' : '' }}>About Us</Link>
            <Link to="/contact" style={{ color: location.pathname === '/contact' ? '#ba9ffb' : '' }}>Contact</Link>
            
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={20} />
                <span style={{ background: 'var(--accent-color)', color: 'black', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {cartCount}
                </span>
            </Link>
            
            {user ? (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Link to="/profile" title="Dashboard"><User size={20} /></Link>
                    {user.role === 'admin' && <Link to="/admin" title="Admin"><Package size={20} /></Link>}
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} title="Logout">
                        <LogOut size={20} color="#ff6b6b" />
                    </a>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto' }}>
                    <Link to="/login" className="btn-outline" style={{ padding: '10px 20px', textAlign: 'center' }}>Log In</Link>
                    <Link to="/register" className="btn-primary" style={{ padding: '10px 20px', textAlign: 'center' }}>Sign Up</Link>
                </div>
            )}
        </>
    );

    return (
        <>
            <motion.nav 
                className="navbar"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{
                    background: scrolled || mobileMenuOpen ? 'rgba(5, 5, 8, 0.9)' : 'transparent',
                    borderBottomColor: scrolled || mobileMenuOpen ? 'var(--glass-border)' : 'transparent',
                    padding: scrolled ? '15px 60px' : '25px 60px'
                }}
            >
                <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="/assets/logo.png" alt="AURA Logo" style={{ height: '35px', filter: 'invert(1)' }} onError={(e) => e.target.style.display='none'} />
                    <span style={{ fontSize: '1.8rem', letterSpacing: '4px' }}>AURA</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links">
                    <NavLinks />
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'white', 
                        cursor: 'pointer',
                        display: 'none', // Shown via CSS
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ width: '25px', height: '2px', background: 'white', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
                        <div style={{ width: '25px', height: '2px', background: 'white', opacity: mobileMenuOpen ? 0 : 1, transition: '0.3s' }}></div>
                        <div style={{ width: '25px', height: '2px', background: 'white', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
                    </div>
                </button>
            </motion.nav>

            {/* Mobile Sidebar/Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '280px',
                            height: '100vh',
                            background: 'rgba(5, 5, 8, 0.98)',
                            backdropFilter: 'blur(30px)',
                            zIndex: 999,
                            padding: '100px 30px 40px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            borderLeft: '1px solid var(--glass-border)',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <NavLinks isMobile={true} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
