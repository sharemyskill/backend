import * as transactionInterface from '../db/interface/transactionInterface.js';
import * as orderInterface from '../db/interface/orderInterface.js';

import mongoose from 'mongoose';
/* eslint-disable */

/**
 * @description this method creates a new transaction
 * @route - POST /api/transaction
 * @access - skiller , admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handlePOSTAddTransaction = async (req, res, next) => {
  try {
    console.log(req.user._id);
    if (req.user._id != req.body.payerId) {
      
      return res.status(400).send({
        data: null,
        message: 'You can not post transaction for someone else',
        status: 'ERROR',
      });
    }

    const transactionQueryResult = await transactionInterface.createTransaction(
      req.body
    );

    if (transactionQueryResult.status == 'OK') {
      return res.status(200).send(transactionQueryResult);
    }

    if (transactionQueryResult.data == 'duplicate') {
      return res.status(200).send(transactionQueryResult);
    }

    return res.status(400).send(transactionQueryResult);
  } catch (e) {
    console.log('In handlePOSTAddTransaction : ' + e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

// const temp = async( req,res,next)=>{
//     try {
//         const orders =[];
//         ["6076cfa408541e2ba057e533","6076cfa408541e2ba057e534","6076cfa408541e2ba057e535","6076cfa408541e2ba057e536","6076cfa408541e2ba057e537"].forEach(item => {
//             let id =  mongoose.Types.ObjectId(item);
//             orders.push(id);
//         });

//         const result = await transactionInterface.getTransactionsforOrder(orders);

//         if( result.status == 'OK' ){
//             return res.status(200).send(result);
//         }

//         return res.status(400).send(result);
//     }catch(e){
//         console.log(e);
//         return res.status(500).send({
//             status: 'EXCEPTION',
//             message: e.message
//         });
//     }
// }

/* eslint-disable */

/**
 * @description this method returns all loans from the database
 * @route - GET /api/transaction?show=all | confirmed | unconfirmed | rejected
 * @access- admin, skiller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETAllTransactions = async (req, res, next) => {
  try {
    /**
     * check if the user is admin or a skiller
     * if admin, show all possible transaction matching the query
     * else , show only the skillers transaction
     */

    let obj = {};

    if (req.user.type == 'skiller') {
      obj = {
        payerId: req.user._id,
      };
    }

    if (req.query?.show && req.query.show != 'all') {
      // to see the rejected transactions admin needs to explicitly state the rejected
      obj['confirmed'] = req.query.show === 'confirmed' ? true : false;
      obj['rejectedStatus'] = req.query.show === 'rejected' ? true : false;
    }

    const transactionQueryResult =
      await transactionInterface.getAllTransactions(obj);

    if (transactionQueryResult.status == 'OK') {
      return res.status(200).send(transactionQueryResult);
    }

    return res.status(400).send(transactionQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

const handleGETaTransaction = async (req, res, next) => {
  try {
    const trxQueryResult = await transactionInterface.getATransactionById(
      req.params.trxId
    );

    if (trxQueryResult.status == 'OK') {
      return res.status(200).send(trxQueryResult);
    }
    return res.status(400).send(trxQueryResult);
  } catch (e) {
    console.log('In handleGETaTransaction : ' + e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

const handlePUTcheckTransaction = async (req, res, next) => {
  try {
    const trxQueryResult = await transactionInterface.changeTrxState(
      {
        id: req.params.trxId,
        newStatus: req.body.status,
        rejectedStatus: req.body.rejectedStatus,
      },
      {
        id: req.user._id,
        type: req.user.type,
      }
    );

    if (trxQueryResult.status == 'OK') {
      res.locals.trx = trxQueryResult.data;
      // if (!trx.confirmed) {
      //     //false means need to delete that transaction
      //     const deletedTrxQuery = await transactionInterface
      //         .deleteTransaction(
      //             req.params.trxId
      //         );
      // }
      //---------------NEED TO SEND NOTIFICATION

      if (trxQueryResult.data?.confirmed) {
        await orderInterface.changeOrderState(
          {
            id: trxQueryResult.data.orderId,
          },
          {
            id: req.user._id,
            type: req.user.type,
          }
        );
      }

      res.status(200).send(trxQueryResult);
      return next();
      // return res.status(200).send(trxQueryResult);
    }
    return res.status(400).send(trxQueryResult);
  } catch (e) {
    console.log('In handlePUTcheckTransaction : ' + e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export {
  handlePOSTAddTransaction,
  handleGETAllTransactions,
  handleGETaTransaction,
  handlePUTcheckTransaction,
  // temp
};
