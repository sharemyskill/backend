import express from 'express';
let orderRouter = express.Router();
import {
    firebaseMiddleware,
    authMiddleware,
    publicMiddleware,
} from '../src/middlewares/auth.js';
import setUser from '../src/middlewares/setUser.js';
import * as orderController from '../controller/orderController.js';
import * as notificationController from '../controller/notificationController.js';

// http://localhost:5000/api/order/6076cfa408541e2ba057e331
orderRouter.post(
    '/',
    // setUser(1),
    authMiddleware,
    orderController.handlePOSTaddOrder,
    notificationController.handlePOSTAddNotification('add')
);

orderRouter.put(
    '/',
    authMiddleware,
    orderController.handlePUTChangeOrderState,
    notificationController.handlePOSTAddNotification('toggle')
);

orderRouter.get('/:userId', orderController.handleGETallOrders);
orderRouter.get('/single/:id', orderController.handleGETaSingleOrder);


export default orderRouter;