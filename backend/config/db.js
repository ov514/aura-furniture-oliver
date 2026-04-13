import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
    try {
        let uri;
        if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('127.0.0.1')) {
            uri = process.env.MONGO_URI;
            const conn = await mongoose.connect(uri);
            console.log(`Cloud MongoDB Connected: ${conn.connection.host}`);
        } else {
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`Virtual MongoDB Connected for Presentation: ${conn.connection.host}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
