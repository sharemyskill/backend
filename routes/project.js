import express from 'express';
let projectRouter = express.Router();

import * as projectController from '../controller/projectController.js';
import { firebaseMiddleware, authMiddleware ,publicMiddleware } from '../src/middlewares/auth.js';
import setUser from '../src/middlewares/setUser.js';


projectRouter
  .route('/')
  .put( 
      // setUser(1),
      authMiddleware , 
      projectController.handleAddProjectsToSkillerPortfolio );

projectRouter
  .route('/:skillerId')
  .get(projectController.handleGETProjectsForASpecificSkiller);

export default projectRouter;
