/* eslint-disable */

import mongoose from 'mongoose'


const ReportSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        unique: true,
        required: true
    },

    issuerId: {
        type: String,
        ref: 'User',
        required: true
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    status: {
        // either refunded or not refunded
        type: Boolean,
        default: false
    },

    detailedReport: {
        type: String,
        maxlength: 150
    }
});

const Report = mongoose.model(`Report`, ReportSchema);


export default Report;