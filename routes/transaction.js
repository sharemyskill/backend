/* eslint-disable */

import express from 'express';
var transactionRouter = express.Router();

import {
  firebaseMiddleware,
  authMiddleware,
  publicMiddleware,
} from '../src/middlewares/auth.js';
import setUser from '../src/middlewares/setUser.js';

import * as transactionController from '../controller/transactionController.js';
import * as notificationController from '../controller/notificationController.js';

// transactionRouter.route('/alog')
//                   .get(transactionController.temp)

transactionRouter.get(
  '/',
  // authMiddleware,
  setUser(1),
  transactionController.handleGETAllTransactions
);
transactionRouter.get('/:trxId', transactionController.handleGETaTransaction);

transactionRouter.put(
  '/:trxId',
  authMiddleware,
  transactionController.handlePUTcheckTransaction,
  notificationController.handlePOSTAddNotification('trx')
);

transactionRouter
  .route('/')
  .post(
    // setUser(1),
     authMiddleware,
    transactionController.handlePOSTAddTransaction);

export default transactionRouter;
