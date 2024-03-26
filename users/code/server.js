import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());

// Use product routes
app.use('/', usersRouter);
app.use((req, res, next) => {
  try {
    // set header before response
    res.status(404).send("Sorry can't find that!");
  } catch (err) {
    next(err);
  }
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});