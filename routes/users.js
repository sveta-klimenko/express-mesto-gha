import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateMyUser,
  updateMyUserAvatar,
} from '../controllers/users.js';

export const user = Router();

user.get('/users', getAllUsers);
user.get('/users/:userId', getUser);
user.post('/users', createUser);
user.patch('/users/me', updateMyUser);
user.patch('/users/me/avatar', updateMyUserAvatar);
