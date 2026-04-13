import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await API.get('/cart');
            setCart(data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async (product, qty = 1) => {
        try {
            if (!user) {
                alert('Please login to add to cart');
                return;
            }
            const { data } = await API.post('/cart/add', {
                productId: product._id,
                name: product.name,
                qty,
                price: product.price,
                image: product.images?.[0] || '',
            });
            setCart(data);
            alert('Added to cart!');
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            const { data } = await API.delete(`/cart/remove/${id}`);
            setCart(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
