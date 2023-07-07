import express from 'express';

import auth from './middleware/auth';
import { apiRegisterUser } from './controllers/register.controller';
import { apiLoginUser } from './controllers/login.controller';
import { apiGetUser } from './controllers/user.controller';

const router = express.Router();

router.route('/register').post(apiRegisterUser);
router.route('/login').post(apiLoginUser);
router.route('/user/profile').get(auth, apiGetUser);

export default router;
