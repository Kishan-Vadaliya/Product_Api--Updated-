import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes'; // Import product routes
import { errorHandler } from './error-handler/applicationError';
import logger from './utils/logger';
 import swaggerUi from 'swagger-ui-express';
 import * as swaggerDocument from './swagger.json';
 import apiLimiter from './middleware/rateLimiter';


dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rate limiting to all requests
app.use(apiLimiter);

// Connect to Database
connectDB();

// Middleware to log all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});


// Product Routes
app.use('/api/products', productRoutes); 

// Default 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      'API not found. Please check our documentation for more information at http://localhost:3000/api-docs/',
  });
});

// Application-level error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  next(err);
});

app.use(errorHandler);

