import express from 'express';
import morgan from 'morgan';
import { homeRoutes } from './routes/home/home.route';
import { aboutRoutes } from './routes/about/about.route';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes

// home route
app.use('/api/v1/home', homeRoutes);

// about routes
app.use('/api/v1/about', aboutRoutes);
export default app;
