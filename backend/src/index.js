import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));