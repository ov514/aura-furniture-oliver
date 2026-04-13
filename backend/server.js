import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './models/Product.js';

// Load routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany([
                {
                    name: 'AURA Modula Sofa', price: 1899.00,
                    description: 'Ultra-premium velvet modular sofa.',
                    category: 'Living Room', images: ['/assets/sofa.png'],
                    color: ['#2d2d2d', '#ba9ffb', '#ffffff'], material: ['Velvet', 'Leather'], stock: 10
                },
                {
                    name: 'Eclipse Orbit Chair', price: 899.00,
                    description: 'A sculptural statement piece.',
                    category: 'Living Room', images: ['/assets/chair.png'],
                    color: ['#000000', '#5a3d31'], material: ['Oak + Leather', 'Walnut + Fabric'], stock: 5
                },
                {
                    name: 'Zenith Dining Table', price: 1499.00,
                    description: 'Immaculate thick glass top.',
                    category: 'Dining', images: ['/assets/table.png'],
                    color: ['#000000'], material: ['Glass + Steel'], stock: 3
                },
                {
                    name: 'Lumina Arch Lamp', price: 349.00,
                    description: 'Minimalist floor lamp.',
                    category: 'Decor', images: ['/assets/logo.png'],
                    color: ['#ffd700'], material: ['Brass'], stock: 15
                },
                {
                    name: 'AURA Platform Bed', price: 2199.00,
                    description: 'Luxurious modern minimalist platform bed with dark wood.',
                    category: 'Bedroom', images: ['/assets/bed.png'],
                    color: ['#444444', '#111111'], material: ['Wood + Velvet'], stock: 8
                },
                {
                    name: 'Sillouette Cabinet', price: 1299.00,
                    description: 'Minimalist luxury wooden bookshelf cabinet with glass doors.',
                    category: 'Office', images: ['/assets/cabinet.png'],
                    color: ['#3e2723'], material: ['Walnut + Glass'], stock: 4
                },
                {
                    name: 'Velvet Lounge Ottoman', price: 499.00,
                    description: 'Curved burgundy leather ottoman for extreme comfort.',
                    category: 'Living Room', images: ['/assets/sofa.png'],
                    color: ['#800020'], material: ['Leather'], stock: 12
                },
                {
                    name: 'AURA Dining Chair', price: 299.00,
                    description: 'Modern dining chair to match the Zenith table.',
                    category: 'Dining', images: ['/assets/chair.png'],
                    color: ['#000000', '#ffffff'], material: ['Steel + Leather'], stock: 20
                }
            ]);
            console.log('Database Seeded with Demo Products!');
        }
    } catch (error) {
        console.error('Seeding error', error);
    }
}

// Connect Database
connectDB().then(seedDatabase);

const app = express();

app.use(cors({
    origin: '*', // For the presentation, we will allow all origins. You can restrict this later to your specific Vercel URL.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('AURA API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
