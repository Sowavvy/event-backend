import express from 'express';
import cors from 'cors';
import eventRouter from './routes/eventRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Use product routes
app.use('/', eventRouter);


const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});