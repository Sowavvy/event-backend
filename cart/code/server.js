import express from 'express';
import cors from 'cors';
import productRouter from './routes/shoppingCartRoutes.js';``
const app = express();
app.use(cors());
app.use(express.json());

// Use product routes
app.use('/', productRouter);
app.use((req, res, next) => {
  try {
    // set header before response
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});