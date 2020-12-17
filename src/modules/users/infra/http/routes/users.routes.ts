import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
// CUSTOM IMPORTS
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);

// CUSTOM IMPORTS CONTROLLER
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', usersController.create);

// Patch is like PUT, but only change ONE field of table
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRoutes;
