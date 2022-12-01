import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  getMyUser,
  createUser,
  updateMyUser,
  updateMyUserAvatar,
} from '../controllers/users.js';
import { routeMeValidate } from '../utils/validator.js';

export const user = Router();

user.get('/users', getAllUsers);
user.get('/users/me', getMyUser);
user.get('/users/:userId', routeMeValidate, getUser);
user.post('/users', createUser);
user.patch('/users/me', updateMyUser);
user.patch('/users/me/avatar', updateMyUserAvatar);
