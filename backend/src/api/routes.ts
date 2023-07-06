import express, { RequestHandler } from 'express';

import UserController from './controllers/user.controller';
import apiAuthUser from './middleware/auth';
const router = express.Router();

router
  .route('/register')
  .post(UserController.apiRegisterUser as RequestHandler);
router.route('/login').post(UserController.apiLoginUser);
router.route('/user/profile').get(apiAuthUser, UserController.apiGetUser);

export default router;
