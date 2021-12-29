import express from 'express';
let reportRouter = express.Router();

import * as reportController from "../controller/reportController.js";

// http://localhost:5000/api/report/
reportRouter.post("/", reportController.handlePOSTaddReport);
reportRouter.get("/:userId", reportController.handleGETallReportsForAUser);

/**
 * Admin Route
 */
reportRouter.get("/", reportController.handleGETReportsForAdmin);

export default reportRouter;