import express from 'express';
let reviewRouter = express.Router();

import * as reviewController from '../controller/reviewController.js';
import setUser from '../src/middlewares/setUser.js';
import { authMiddleware } from '../src/middlewares/auth.js';

reviewRouter.post(
  '/',
//   setUser(1),
   authMiddleware,
  reviewController.handlePOSTAddReview
);
reviewRouter.get('/:skillerId', reviewController.handleGETAllReviews);

//api/review/rating/:skillerId
reviewRouter.get(
  '/rating/:skillerId',
  reviewController.handleGETAvgRatingOfSkiller
); //

export default reviewRouter;
