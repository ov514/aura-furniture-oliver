import React, { useEffect, useState } from 'react';
import API from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, MessageSquare, RefreshCw } from 'lucide-react';

/* ── tiny helper ── */
const Badge = ({ label, color }) => (
    <span style={{
        padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
        background: `${color}22`, color, border: `1px solid ${color}`
    }}>{label}</span>
);

/* ── shared table wrapper ── */
const TableWrap = ({ children }) => (
    <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', minWidth: 600 }}>
            {children}
        </table>
    </div>
);

const TH = ({ children }) => (
    <th style={{ textAlign: 'left', padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {children}
    </th>
);
const TD = ({ children, style }) => (
    <td style={{ padding: '14px 16px', fontSize: '0.92rem', borderBottom: '1px solid rgba(255,255,255,0.04)', ...style }}>
        {children}
    </td>
);

/* ── tabs config ── */
const TABS = [
    { key: 'orders',        label: 'Purchase Orders',   icon: <ShoppingBag  size={16} /> },
    { key: 'custom-orders', label: 'Custom Requests',   icon: <Sparkles     size={16} /> },
    { key: 'contact',       label: 'Contact Messages',  icon: <MessageSquare size={16} /> },
];

/* ════════════════════════════════════════════════════════════ */
const AdminOrders = () => {
    const [tab,     setTab]     = useState('orders');
    const [data,    setData]    = useState({ orders: [], 'custom-orders': [], contact: [] });
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState('');

    const fetchAll = async () => {
        setLoading(true);
        setError('');
        try {
            const [orders, customs, contacts] = await Promise.all([
                API.get('/orders'),
                API.get('/custom-orders'),
                API.get('/contact'),
            ]);
            setData({
                orders:          orders.data,
                'custom-orders': customs.data,
                contact:         contacts.data,
            });
        } catch (err) {
            setError('Failed to load data. Make sure you are logged in as admin.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    /* ── Purchase Orders table ── */
    const OrdersTable = () => (
        data.orders.length === 0
            ? <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No purchase orders yet.</p>
            : <TableWrap>
                <thead><tr><TH>Date</TH><TH>Customer</TH><TH>Total</TH><TH>Card (masked)</TH><TH>Status</TH></tr></thead>
                <tbody>
                    {data.orders.map(o => (
                        <tr key={o._id}>
                            <TD>{new Date(o.createdAt).toLocaleDateString()}</TD>
                            <TD>{o.user?.name || o.user?.email || 'Unknown'}</TD>
                            <TD style={{ color: '#ba9ffb', fontWeight: 700 }}>${o.totalPrice?.toFixed(2)}</TD>
                            <TD style={{ fontSize: '0.85rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{o.paymentResult?.cardholderName || '—'}</span><br />
                                {o.paymentResult?.cardNumberMasked || '—'}
                            </TD>
                            <TD><Badge label={o.isPaid ? 'PAID' : 'PENDING'} color={o.isPaid ? '#2ed573' : '#ff6b6b'} /></TD>
                        </tr>
                    ))}
                </tbody>
            </TableWrap>
    );

    /* ── Custom Orders table ── */
    const CustomTable = () => (
        data['custom-orders'].length === 0
            ? <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No custom requests yet.</p>
            : <TableWrap>
                <thead><tr><TH>Date</TH><TH>Name</TH><TH>Email</TH><TH>Phone</TH><TH>Room</TH><TH>Style</TH><TH>Budget</TH><TH>Consult Date</TH><TH>Vision</TH></tr></thead>
                <tbody>
                    {data['custom-orders'].map(c => (
                        <tr key={c._id}>
                            <TD style={{ whiteSpace: 'nowrap' }}>{new Date(c.createdAt).toLocaleDateString()}</TD>
                            <TD style={{ fontWeight: 600 }}>{c.name}</TD>
                            <TD style={{ color: '#ba9ffb' }}>{c.email}</TD>
                            <TD>{c.phone || '—'}</TD>
                            <TD>{c.room}</TD>
                            <TD>{c.style}</TD>
                            <TD><Badge label={c.budget} color="#7B9FFF" /></TD>
                            <TD style={{ whiteSpace: 'nowrap' }}>{c.date || '—'}</TD>
                            <TD style={{ maxWidth: 220, color: 'rgba(255,255,255,0.7)', fontSize: '0.83rem' }}>
                                <div style={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {c.description}
                                </div>
                            </TD>
                        </tr>
                    ))}
                </tbody>
            </TableWrap>
    );

    /* ── Contact Messages table ── */
    const ContactTable = () => (
        data.contact.length === 0
            ? <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px' }}>No contact messages yet.</p>
            : <TableWrap>
                <thead><tr><TH>Date</TH><TH>Name</TH><TH>Email</TH><TH>Message</TH></tr></thead>
                <tbody>
                    {data.contact.map(m => (
                        <tr key={m._id}>
                            <TD style={{ whiteSpace: 'nowrap' }}>{new Date(m.createdAt).toLocaleDateString()}</TD>
                            <TD style={{ fontWeight: 600 }}>{m.firstName} {m.lastName}</TD>
                            <TD style={{ color: '#ba9ffb' }}>{m.email}</TD>
                            <TD style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 380 }}>{m.message}</TD>
                        </tr>
                    ))}
                </tbody>
            </TableWrap>
    );

    const panels = { orders: OrdersTable, 'custom-orders': CustomTable, contact: ContactTable };
    const ActivePanel = panels[tab];
    const counts = { orders: data.orders.length, 'custom-orders': data['custom-orders'].length, contact: data.contact.length };

    return (
        <motion.div
            className="page-container"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 1100, marginBottom: 36 }}>
                <h1 className="text-gradient" style={{ margin: 0 }}>Admin Dashboard</h1>
                <button
                    onClick={fetchAll}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(186,159,251,0.12)', border: '1px solid rgba(186,159,251,0.3)', color: '#ba9ffb', padding: '10px 18px', borderRadius: 12, cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    <RefreshCw size={15} /> Refresh
                </button>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: '100%', maxWidth: 1100, marginBottom: 32 }}>
                {TABS.map(t => (
                    <motion.div
                        key={t.key}
                        className="glass-panel"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setTab(t.key)}
                        style={{ cursor: 'pointer', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 16, border: tab === t.key ? '1px solid rgba(186,159,251,0.5)' : undefined }}
                    >
                        <div style={{ background: 'rgba(186,159,251,0.1)', padding: 12, borderRadius: 12, color: '#ba9ffb' }}>{t.icon}</div>
                        <div>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{loading ? '…' : counts[t.key]}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: 6, borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
                {TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 22px', borderRadius: 10, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, border: 'none', transition: 'all 0.25s',
                            background: tab === t.key ? 'rgba(186,159,251,0.2)' : 'transparent',
                            color: tab === t.key ? '#ba9ffb' : 'rgba(255,255,255,0.45)',
                        }}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* Main panel */}
            <div className="glass-panel" style={{ width: '100%', maxWidth: 1100, padding: '30px', overflowX: 'auto' }}>
                {error && (
                    <div style={{ color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '14px 20px', borderRadius: 12, marginBottom: 24 }}>{error}</div>
                )}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <motion.div
                            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ display: 'inline-block', color: '#ba9ffb' }}
                        >
                            <RefreshCw size={32} />
                        </motion.div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>Loading data…</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                            <ActivePanel />
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default AdminOrders;
