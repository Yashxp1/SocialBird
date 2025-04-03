import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from '../controllers/message.controller';

const messageRoute = express.Router();

messageRoute.get('/users', protectRoute, getUsersForSidebar);
messageRoute.get('/:id', protectRoute, getMessages);
messageRoute.post('/send/:id', protectRoute, sendMessage);

export default messageRoute;
