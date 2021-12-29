import express from 'express';
import setUser from '../src/middlewares/setUser.js';
import { firebaseMiddleware, authMiddleware } from '../src/middlewares/auth.js';
import { checkIfAdmin } from '../src/middlewares/userCheck.js';

let adminRouter = express.Router();

import * as adminController from '../controller/adminController.js';

adminRouter.route('/toggle').put(
  // setUser(),
  firebaseMiddleware,
  checkIfAdmin(),
  adminController.handlePUTTogglePopularity
);

export default adminRouter;
