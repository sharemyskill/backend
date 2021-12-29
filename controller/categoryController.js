/* eslint-disable */
import * as categoryInterface from '../db/interface/categoryInterface.js';
import * as userInterface from '../db/interface/userInterface.js';

/**
 * @description this method returns all categories from the database
 * @route - GET /api/category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETAllCategories = async (req, res, next) => {
  try {
    const categoryQueryResult = await categoryInterface.getAllCategories();

    if (categoryQueryResult.status == 'OK') {
      return res.status(200).send(categoryQueryResult);
    }

    return res.status(400).send(categoryQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/**
 * @description this method creates a new category
 * @route - POST /api/category
 * @param {*} req - body will include category name and subcategory names array
 * @param {*} res
 * @param {*} next
 */
const handlePOSTCreateCategory = async (req, res, next) => {
  try {
    const categoryQueryResult = await categoryInterface.createCategory(
      req.body,
      req.file.filename,
      req.file.mimetype
    );

    if (categoryQueryResult.status == 'OK') {
      return res.status(200).send(categoryQueryResult);
    }

    return res.status(400).send(categoryQueryResult);
  } catch (e) {
    console.log('EXCEPTION');
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/**
 * @description this method returns a category from the database by it's id
 * @route - GET /api/category?sub= or GET /api/category?cat=
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETSubCategoryByName = async (req, res, next) => {
  try {
    let userQueryResultForSubcat , userQueryResultForCategory , result = [];

    if (req.query?.sub) {
      userQueryResultForSubcat = await userInterface.getUsersSubCategory(
        req.query?.sub.split(',')
      );

      if( userQueryResultForSubcat.status == "OK" ){
        result.push( ...userQueryResultForSubcat.data )
      }
    } 
    
    if ( req.query?.cat ) {
      userQueryResultForCategory = await userInterface.getUsersFromCategory(req.query?.cat);
      if( userQueryResultForCategory.status == 'OK' ){
        result.push( ...userQueryResultForCategory.data )
      }
    }

    
    if (result.length != 0) {
      return res.status(200).send({
        data: result,
        message: "Users found",
        status: "OK"
      });
    }

    return res.status(400).send({
      data: null,
      message: "Users not found",
      status: "OK"
    });
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/**
 * @description this method updates a category from the database by it's id and inserts new subcategories in it
 * @route - PUT /api/category/:id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handlePUTCategoryById = async (req, res, next) => {
  try {
    const categoryQueryResult = await categoryInterface.updateSubCategory(
      req.params.id,
      req.body
    );

    if (categoryQueryResult.status == 'OK') {
      return res.status(200).send(categoryQueryResult);
    }

    return res.status(400).send(categoryQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export {
  handleGETAllCategories,
  handleGETSubCategoryByName,
  handlePOSTCreateCategory,
  handlePUTCategoryById,
};
