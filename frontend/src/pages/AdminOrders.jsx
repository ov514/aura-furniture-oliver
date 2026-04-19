import React, { useEffect, useState } from 'react';
import API from '../api';
import { motion } from 'framer-motion';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="page-container glass-panel" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 className="text-gradient">Loading Orders...</h2>
            </div>
        );
    }

    return (
        <motion.div 
            className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
        >
            <h1 className="text-gradient" style={{ marginBottom: '40px' }}>Admin: Order Management</h1>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', padding: '30px', overflowX: 'auto' }}>
                {orders.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>No orders found.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ textAlign: 'left', padding: '15px' }}>Date</th>
                                <th style={{ textAlign: 'left', padding: '15px' }}>User</th>
                                <th style={{ textAlign: 'left', padding: '15px' }}>Total</th>
                                <th style={{ textAlign: 'left', padding: '15px' }}>Banking Data (Masked)</th>
                                <th style={{ textAlign: 'left', padding: '15px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '15px' }}>{order.user?.name || 'Unknown'}</td>
                                    <td style={{ padding: '15px' }}>${order.totalPrice.toFixed(2)}</td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ fontSize: '0.9rem' }}>
                                            <strong>Name:</strong> {order.paymentResult?.cardholderName || 'N/A'}<br/>
                                            <strong>Card:</strong> {order.paymentResult?.cardNumberMasked || 'N/A'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ 
                                            padding: '5px 10px', 
                                            borderRadius: '15px', 
                                            fontSize: '0.8rem',
                                            backgroundColor: order.isPaid ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                                            color: order.isPaid ? '#00ff00' : '#ff0000',
                                            border: `1px solid ${order.isPaid ? '#00ff00' : '#ff0000'}`
                                        }}>
                                            {order.isPaid ? 'PAID' : 'PENDING'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );
};

export default AdminOrders;
