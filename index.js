import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import Connection from './src/DB/Connection.js';
import AuthRoutes from './src/Routes/AuthRoutes.js';
import AdminRoutes from './src/Routes/AdminRoutes.js';
import DistrictRoutes from './src/Routes/DistrictRoutes.js';
import CityRoutes from './src/Routes/CityRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Database Connection
Connection();

// Middlewares
app.use(express.json());
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin: ["http://localhost:3000", "http://localhost:8081"],

}
));

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin',AdminRoutes);
app.use('/api/district',DistrictRoutes);
app.use('/api/city',CityRoutes);

app.get('/', (req, res) => {
    res.send('test');
});

// Start Server
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));