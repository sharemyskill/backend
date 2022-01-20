import express from 'express';
let notifyRouter = express.Router();

import * as notifyController from '../controller/notificationController.js';

import { firebaseMiddleware, authMiddleware } from '../src/middlewares/auth.js';
import setUser from '../src/middlewares/setUser.js';

// http://localhost:5000/api/notify/6076cfa408541e2ba057e341
notifyRouter.get(
  '/',
  // setUser(1),
  authMiddleware,
  notifyController.handleGETallNotificationForAUser
);
notifyRouter.put(
  '/:notificationId',
  // setUser(1),
  authMiddleware,
  notifyController.handlePUTUpdateNotificationStatus
);

export default notifyRouter;
