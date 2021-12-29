import express from 'express';
let notifyRouter = express.Router();

import * as notifyController from "../controller/notificationController.js";

// http://localhost:5000/api/notify/6076cfa408541e2ba057e341
notifyRouter.get("/:userId", notifyController.handleGETallNotificationForAUser);

export default notifyRouter;