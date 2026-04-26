import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    email:       { type: String, required: true },
    phone:       { type: String },
    room:        { type: String, required: true },
    style:       { type: String, required: true },
    budget:      { type: String, required: true },
    dimensions:  { type: String },
    date:        { type: String },
    description: { type: String, required: true },
}, { timestamps: true });

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);
export default CustomOrder;
