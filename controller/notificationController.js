import * as notifyInterface from '../db/interface/notificationInterface.js';
import * as userInterface from '../db/interface/userInterface.js';
import * as transactionInterface from '../db/interface/transactionInterface.js';

const handleGETallNotificationForAUser = async (req, res, next) => {
  try {
    const notifyQueryResult = await notifyInterface.getAllNotificationsForAUser(
      req.user._id
    );
    if (notifyQueryResult.status == 'OK') {
      return res.status(200).send(notifyQueryResult);
    }
    return res.status(400).send(notifyQueryResult);
  } catch (e) {
    console.log('In handleGETallNotificationForAUser: ' + e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method adds notification to the database
 * @route - POST /api/notify
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handlePOSTAddNotification = (type) => async (req, res, next) => {
  try {
    let skiller;

    if (type == 'add') {
      // means we are adding an order

      skiller = await userInterface.getUserById(res.locals.order.skiller);

      await notifyInterface.addNotification({
        user: res.locals.order.buyer,
        notification: `Your order request for skiller ${skiller.data.name} has been placed.`,
        orderId: res.locals.order._id,
      });

      await notifyInterface.addNotification({
        user: res.locals.order.skiller,
        notification: `Buyer ${req.user.name} has made an order request.`,
        orderId: res.locals.order._id,
      });
    }
    /** 
             * 
             * 1) Notification needs to pushed in different routes
            		a. Placing an order ( buyer + seller )
            		b. Order reject / confirm(accepted) ( buyer )
            		c. Order cancel ( seller )
            		d. Order complete + payment verified ( seller )
            		e. Payment made but not verified ( seller )
            		f. Report made ( seller )
            		g. Report checked by admin ( seller )
            Buyer has posted a review ( seller )
            */
    if (type == 'toggle') {
      skiller = await userInterface.getUserById(res.locals.order.skiller);
      let order = res.locals.order;
      if (
        order.orderStatus === 'accepted' ||
        order.orderStatus === 'rejected'
      ) {
        /**
         * @buyer will be notified
         */
        await notifyInterface.addNotification({
          user: order.buyer,
          notification: `Skiller ${skiller.data.name} has ${order.orderStatus} the order.`,
          orderId: res.locals.order._id,
        });
      }
      if (order.orderStatus === 'canceled') {
        /**
         * @seller/skiller will be notified
         */
        await notifyInterface.addNotification({
          user: order.skiller,
          notification: `Buyer ${req.user.name} canceled the order.`,
          orderId: res.locals.order._id,
        });
      }
    }

    if (type == 'trx') {
      let trxData = res.locals.trx;

      if (trxData.confirmed) {
        await notifyInterface.addNotification({
          user: trxData.payerId,
          notification: `Admin Accepted the Payment and order is completed.`,
          orderId: res.locals.orderId,
        });
      } else {
        //false means need to delete that transaction
        const deletedTrxQuery = await transactionInterface.deleteTransaction(
          req.params.trxId
        );
        await notifyInterface.addNotification({
          user: trxData.payerId,
          notification: `Admin canceled the order.`,
          orderId: res.locals.orderId,
        });
      }
    }

    return;
  } catch (e) {
    console.log(e);
  }
};

/* eslint-disable */

/**
 * @description this method updates seen status for a notification
 * @route - GET /api/notify/:notificationId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handlePUTUpdateNotificationStatus = async (req, res, next) => {
  try {
    const notficationQueryResult =
      await notifyInterface.updateNotificationStatus( req.user._id , req.params.notificationId);

    if (notficationQueryResult.status == 'OK') {
      return res.status(200).send(notficationQueryResult);
    }

    return res.status(400).send(notficationQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export {
  handleGETallNotificationForAUser,
  handlePOSTAddNotification,
  handlePUTUpdateNotificationStatus,
};
