import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    // Form states
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    // Payment states
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
        return (
            <div className="page-container glass-panel" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 className="text-gradient">Your Cart is Empty</h2>
            </div>
        );
    }

    const total = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        try {
            // Mask the card number for "banking data" display
            const maskedCard = cardNumber.slice(-4).padStart(cardNumber.length, '*');

            const orderData = {
                orderItems: cart.cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item.product
                })),
                shippingAddress: {
                    address,
                    city,
                    postalCode,
                    country
                },
                totalPrice: total,
                paymentResult: {
                    cardholderName: cardName,
                    cardNumberMasked: maskedCard
                }
            };

            await API.post('/orders', orderData);
            await clearCart();
            
            setProcessing(false);
            setShowPaymentModal(false);
            alert("Order Placed Successfully!");
            navigate('/admin/orders'); // Redirect to where they can see the data
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please check if you are logged in.');
            setProcessing(false);
        }
    };

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
            
            {/* Shipping Address Section */}
            <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', marginTop: '20px', padding: '20px' }}>
                <h3 className="text-gradient" style={{ marginBottom: '20px' }}>Shipping Address</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ gridColumn: 'span 2' }} />
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} style={{ gridColumn: 'span 2' }} />
                </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right', width: '100%', maxWidth: '600px' }}>
                <h2>Total: <span className="text-gradient">${total.toFixed(2)}</span></h2>
                <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => setShowPaymentModal(true)}>Proceed to Checkout</button>
            </div>

            {showPaymentModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
                }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '30px' }}
                    >
                        <h2 className="text-gradient" style={{ marginBottom: '20px' }}>Payment Information</h2>
                        <form onSubmit={handlePayment}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255,255,255,0.8)' }}>Cardholder Name</label>
                                <input 
                                    type="text" required 
                                    value={cardName} onChange={(e) => setCardName(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255,255,255,0.8)' }}>Card Number</label>
                                <input 
                                    type="text" required pattern="\d{16}" title="16 digit card number" placeholder="XXXX XXXX XXXX XXXX" 
                                    value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255,255,255,0.8)' }}>Expiry</label>
                                    <input type="text" required placeholder="MM/YY" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', color: 'rgba(255,255,255,0.8)' }}>CVV</label>
                                    <input type="text" required pattern="\d{3,4}" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={() => setShowPaymentModal(false)} disabled={processing}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={processing}>
                                    {processing ? 'Processing...' : 'Pay Now'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;
