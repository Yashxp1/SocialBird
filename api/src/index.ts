import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server started on PORT: ${PORT}`);
  } catch (error) {
    console.log('FAILED to connect to DB', error);
    process.exit(1)
  }
});

