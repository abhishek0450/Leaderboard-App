import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

const app = express();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ Database connected successfully');

        // Middleware 
        app.use(cors()); 
        app.use(express.json()); 

        // API routes
        app.use('/api', userRoutes);

        // Health check endpoint
        app.get('/', (req, res) => {
            res.json({ 
                message: 'Leaderboard API is running!', 
                status: 'healthy',
                timestamp: new Date().toISOString()
            });
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 API endpoints available at http://localhost:${PORT}/api`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1); 
    }
};

startServer();