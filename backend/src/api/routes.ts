import express from 'express';

import { apiLoginUser } from './controllers/auth/login.controller';
import { apiLogoutUser } from './controllers/auth/logout.controller';
import { apiRegisterUser } from './controllers/auth/register.controller';
import { apiGetUser } from './controllers/auth/user.controller';
import auth from './middleware/auth';

import {
  apiCreatePost,
  apiDeletePost,
  apiGetPost,
  apiGetPosts,
  apiUpdatePost,
} from './controllers/posts/posts.controller';

const router = express.Router();

router.route('/register').post(apiRegisterUser);
router.route('/login').post(apiLoginUser);
router.route('/logout').post(auth, apiLogoutUser);
router.route('/user').get(auth, apiGetUser);

router.route('/posts').post(auth, apiCreatePost);
router.route('/posts').get(apiGetPosts);
router.route('/posts/:id').get(apiGetPost);
router.route('/posts/:id').put(auth, apiUpdatePost);
router.route('/posts/:id').delete(auth, apiDeletePost);

export default router;
