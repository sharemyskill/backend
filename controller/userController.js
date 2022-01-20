import * as userInterface from '../db/interface/userInterface.js';
import * as transactionInterface from '../db/interface/transactionInterface.js';
import * as reviewInterface from '../db/interface/reviewInterface.js';
import * as orderInterface from '../db/interface/orderInterface.js';

/* eslint-disable */

/**
 * @description this method returns all loans from the database
 * @route - GET /api/user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETAllUsers = async (req, res, next) => {
  try {
    const userQueryResult = await userInterface.getAllUsers();

    if (userQueryResult.status == 'OK') {
      return res.status(200).send(userQueryResult);
    }

    return res.status(400).send(userQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method returns user from the database or adds the user to the database
 * @route - GET /api/user/get-or-create
 * @body - will include user info from firebase
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETUser = async (req, res) => {
  try {
    let userQueryResult = await userInterface.getUserById(req.user.uid);

    if (userQueryResult.status == 'OK') {
      // means the user is already in the database
      return res.status(200).send(userQueryResult);
    } else {
      // insert the user into the database
      userQueryResult = await userInterface.createUser(req.user);

      if (userQueryResult.status == 'OK') {
        return res.status(200).send(userQueryResult);
      }
    }

    return res.status(400).send(userQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method returns single user from the database
 * @returns - for
 * @route - GET /api/user/:id?sort=&order=
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETSingleUser = async (req, res, next) => {
  try {
    const userQueryResult = await userInterface.getUserById(req.params.id);

    if (userQueryResult.status == 'OK') {
      const reviewQueryResult =
        await reviewInterface.allReviewsForSpecificSkiller(
          req.params.id,
          req.query?.sort,
          req.query?.order
        );

      let result = {
        reviews: reviewQueryResult?.data?.allReviews,
        totalReviews: reviewQueryResult?.data?.total,
        user: userQueryResult.data,
      };

      let orderQueryResult;
      // check if self or not
      if (req.self) {
        orderQueryResult = await orderInterface.getAllOrdersForSpecificUser(
          req.user._id,
          // {
          //   // orderStatus: {
          //   //   $ne: 'completed',
          //   // },
          // },
          undefined,
          {
            orderDate: -1,
          }
        );

        result.newOrders = orderQueryResult.data?.requestedOrder;
        result.acceptedOrders = [];
        result.completedOrders = orderQueryResult.data?.completedOrder;

        if (userQueryResult.data.type == 'skiller') {
          let transactions = await transactionInterface.getTransactionsforOrder(
            orderQueryResult.data?.acceptedOrder
          );
          
          if (orderQueryResult.data.currentlyAcceptedOrderCount > 0) {
            orderQueryResult.data?.acceptedOrder.forEach((item) => {
              let obj = item;
             
              if (transactions.data[item._id]?.confirmed) {
                obj.orderStatus = 'verified';
              } else if (transactions.data[item._id] != undefined) {
                
                obj.orderStatus = 'unverified';
              }

              result.acceptedOrders.push(obj);
            });
          }
        } else if (userQueryResult.data.type == 'buyer') {
          result.acceptedOrders = orderQueryResult.data?.acceptedOrder;
        }
      }

      return res.status(200).send(result);
    }

    return res.status(400).send(userQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method returns all necessary details from the database for the homepage ( popular category , popular skillers )
 * @route - GET /api/user/home
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETHomePage = async (req, res, next) => {
  try {
    const userQueryResult = await userInterface.getAllUsers(
      { isPopular: true },
      parseInt(req.query?.limit),
      {
        // sort criteria
        rating: -1,
        joinDate: 1,
      }
    );

    // const categoryQueryResult = await categoryInterface.getAllCategories(
    //   { isPopular: true },
    //   parseInt(req.query?.limit)
    // );

    if (
      userQueryResult.status == 'OK'
      // && categoryQueryResult.status == 'OK'
    ) {
      let data = {
        skillers: userQueryResult.data,
        // categories: categoryQueryResult.data,
        status: 'OK',
        message: `Popular skillers and categories found from the database`,
      };

      return res.status(200).send(data);
    }

    return res.status(400).send(userQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method registers a user in the database
 * @route - PUT /api/user/register
 * @param {*} req - body includes name , type , category , subcategory , description , whatsapp , bkash
 * @param {*} res
 * @param {*} next
 */
const handlePUTRegisterUser = async (req, res, next) => {
  try {
    if (req.user.name) {
      return res.status(200).send({
        data: req.user,
        status: 'OK',
        message: 'The user has already been registered',
      });
    }

    const userQueryResult = await userInterface.registerUser(
      {
        id: req.user._id,
        ...req.body,
      },
      req.file
    );


    if (userQueryResult.status == 'OK') {
      return res.status(200).send(userQueryResult);
    }

    return res.status(400).send(userQueryResult);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export {
  handleGETAllUsers,
  handleGETUser,
  handleGETHomePage,
  handlePUTRegisterUser,
  handleGETSingleUser,
};
