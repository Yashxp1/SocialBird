import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes';
import messageRoute from './routes/message.routes';
import { app, server } from './lib/socket';

// const app = express();/

dotenv.config();


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/v1', authRoute);
app.use('/api/v1', messageRoute);

server.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server started on PORT: ${PORT}`);
  } catch (error) {
    console.log('FAILED to connect to DB', error);
    process.exit(1);
  }
});
