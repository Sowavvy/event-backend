import express from 'express';
import cors from 'cors';

import driversRouter from './routes/drivers.js';

const app = express();
const PORT = 3003;

app.use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors());

app.use('/drivers', driversRouter);

export default app;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
