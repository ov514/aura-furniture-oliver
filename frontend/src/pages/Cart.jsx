import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
        return (
            <div className="page-container glass-panel" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 className="text-gradient">Your Cart is Empty</h2>
            </div>
        );
    }

    const total = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <motion.div 
            className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
        >
            <h1 className="text-gradient" style={{ marginBottom: '40px' }}>Shopping Cart</h1>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
                {cart.cartItems.map((item) => (
                    <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ flex: '1 1 200px' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Qty: {item.qty} x ${item.price.toFixed(2)}</p>
                        </div>
                        <button className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }} onClick={() => removeFromCart(item.product)}>Remove</button>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '30px', textAlign: 'right', width: '100%', maxWidth: '600px' }}>
                <h2>Total: <span className="text-gradient">${total.toFixed(2)}</span></h2>
                <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>Proceed to Checkout</button>
            </div>
        </motion.div>
    );
};

export default Cart;
