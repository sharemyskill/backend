import User from '../models/User.js';
import Notification from '../models/Notification.js';

const getAllNotificationsForAUser = async (userId) => {
  try {
    const allNotifications = await Notification.find({
      user: userId,
    })
      // .populate({
      //     path: 'user',
      //     // select: ' ',  /for specific field
      // })
      .sort({
        //1 is used for ascending order while -1 is used for descending order.
        notifyDate: -1,
      });

    return {
      data: allNotifications,
      status: 'OK',
      message: `All Notifications send for a specific User from the DB`,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

/* eslint-disable */

/* eslint-disable */

/**
 * @description add notification to schema
 * @returns added notification
 */
const addNotification = async (body) => {
  try {
    const notification = await Notification.create(body);

    if (notification) {
      return {
        data: notification,
        status: 'OK',
        message: `New notification added to the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No notification added to the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

/* eslint-disable */

/* eslint-disable */

/**
 * @description update seen status
 * @returns updated notif
 */
const updateNotificationStatus = async (user, id) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        user,
        seen : false
      },
      {
        seen: true,
      }, {
        new: true
      }
    );

    if (notification) {
      return {
        data: notification,
        status: 'OK',
        message: `Notification updated from the database`,
      };
    }

    return {
      data: null,
      status: 'OK',
      message: `No notification updated from the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

export {
  getAllNotificationsForAUser,
  addNotification,
  updateNotificationStatus,
};
