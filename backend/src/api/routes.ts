import express from 'express';

import auth from './middleware/auth';
import { apiRegisterUser } from './controllers/register.controller';
import { apiLoginUser } from './controllers/login.controller';
import { apiGetUser } from './controllers/user.controller';
import {
  apiCreatePost,
  apiDeletePost,
  apiGetPost,
  apiGetPosts,
  apiUpdatePost,
} from './controllers/posts.controller';

const router = express.Router();

router.route('/register').post(apiRegisterUser);
router.route('/login').post(apiLoginUser);
router.route('/user/profile').get(auth, apiGetUser);

router.route('/posts').post(auth, apiCreatePost);
router.route('/posts').get(apiGetPosts);
router.route('/posts/:id').get(auth, apiGetPost);
router.route('/posts/:id').put(auth, apiUpdatePost);
router.route('/posts/:id').delete(auth, apiDeletePost);

export default router;
