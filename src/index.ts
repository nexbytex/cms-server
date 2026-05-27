import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from "./routes/user.routes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Athuntication routes
app.use('/api/auth', authRoutes);

// User management routes
app.use('/api/users', userRoutes);


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'CMS server is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

export default app;