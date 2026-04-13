import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, cartItems: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, name, qty, price, image } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, cartItems: [] });
        }

        const existItem = cart.cartItems.find(x => x.product.toString() === productId);
        if (existItem) {
            existItem.qty += Number(qty);
        } else {
            cart.cartItems.push({ product: productId, name, qty, price, image });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params; // cartItem id or product id
        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.cartItems = cart.cartItems.filter(x => x.product.toString() !== id);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
