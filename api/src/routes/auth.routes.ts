import express from 'express';
import {
  login,
  logout,
  register,
  updateProfile,
  checkAuth,
} from '../controllers/user.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post('/auth/register', register);
authRoute.post('/auth/login', login);
authRoute.post('/auth/logout', logout);
authRoute.put('/auth/update-profile', protectRoute, updateProfile);
authRoute.get('/check', protectRoute, checkAuth);

export default authRoute;
