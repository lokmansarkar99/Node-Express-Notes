import express from 'express';
import dbConnect from './db.js';

const app = express();
const PORT = 3000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
