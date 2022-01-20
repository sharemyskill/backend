/* eslint-disable */

// var express = require('express');
import express from 'express';
let categoryRouter = express.Router();

import * as categoryController from '../controller/categoryController.js'
import {imageUpload} from '../src/middlewares/uploadImage.js'

categoryRouter.route('/')
    .get(categoryController.handleGETSubCategoryByName)
    .post( imageUpload('category') , categoryController.handlePOSTCreateCategory);


categoryRouter.route('/:id')
    .put(categoryController.handlePUTCategoryById);


export default categoryRouter;