import express, { Express } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import itemRoutes from './routes/itemRoutes';
import path from 'path';

const app = express();
app.use(express.json());

// declaring the use of ejs engine and to look for files inside views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', itemRoutes);

// serve static assets
const assetsPath = path.join(__dirname, '../public');
app.use(express.static(assetsPath));

// Global error handler
app.use(errorHandler);

export default app;
