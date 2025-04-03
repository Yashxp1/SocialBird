import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import { getUsersForSidebar } from '../controllers/message.controller';

const messageRoute = express.Router();

messageRoute.get('/users', protectRoute, getUsersForSidebar);
messageRoute.get('/:id', protectRoute, getUsersForSidebar);

export default messageRoute
