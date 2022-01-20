import express from 'express';

let userRouter = express.Router();

import * as userController from '../controller/userController.js';
import { firebaseMiddleware, authMiddleware ,publicMiddleware } from '../src/middlewares/auth.js';
import {imageUpload} from '../src/middlewares/uploadImage.js';
import { userCheck } from '../src/middlewares/userCheck.js';
import setUser from '../src/middlewares/setUser.js';

userRouter.route('/').get(userController.handleGETAllUsers);

userRouter.route('/home').get(userController.handleGETHomePage);

userRouter.route('/get-or-create').get(
  // setUser(),
  firebaseMiddleware,
  userController.handleGETUser
);

userRouter.route('/register').put(
  // setUser(1),
  authMiddleware,
  imageUpload('user'),
  userController.handlePUTRegisterUser
);

userRouter.route('/:id').get(
  //setUser(1),
  publicMiddleware,
  userCheck,
  userController.handleGETSingleUser
);

export default userRouter;
