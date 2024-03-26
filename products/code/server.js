import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

// Use product routes
app.use('/', productRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});