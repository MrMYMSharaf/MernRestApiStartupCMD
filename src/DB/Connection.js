import mongoose from 'mongoose';

const Connection = async () => {
    const URL = process.env.MONGODB_URL;
    try {
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database connection error: ', error);
    }
};

export default Connection;