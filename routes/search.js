import express from 'express';
let searchRouter = express.Router();
import * as searchController from '../controller/searchController.js';

import { publicMiddleware } from '../src/middlewares/auth.js';
import setUser from '../src/middlewares/setUser.js';

// http://localhost:5000/api/search/:id?text=
searchRouter.get(
  '/',
  publicMiddleware,
  searchController.handleGETsearchUser
);

export default searchRouter;
