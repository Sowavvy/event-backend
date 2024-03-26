import express from 'express';
import cors from 'cors';
import farmerRouter from './routes/farmerRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Use product routes
app.use('/', farmerRouter);

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});