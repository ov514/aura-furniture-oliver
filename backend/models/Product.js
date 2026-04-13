import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        threeD_model: { type: String }, // Path to .glb file
        stock: { type: Number, required: true, default: 0 },
        material: [{ type: String }],
        color: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
