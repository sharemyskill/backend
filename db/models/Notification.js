/* eslint-disable */

import mongoose from 'mongoose'
// const validate = require('../validate');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    notifyDate: {
        type: Date,
        default: Date.now
    },


    notification: {
        type: String
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
});

const Notification = mongoose.model(`Notification`, NotificationSchema);


export default Notification;