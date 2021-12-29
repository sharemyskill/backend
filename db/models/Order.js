/* eslint-disable */
import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    orderStatus: {
        type: String,
        enum: ['requested', 'accepted', 'completed','canceled','rejected'],
        default: 'requested'
    },
    projectSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'small'
    },  

    orderDetails : {
        type: String
    },

    price: {
        type: Number,
        min: 0,
    },
    duration: {
        type: Number, //Duration will be calculated in days
        min: 1
    },
    skiller: {
        type: String,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: String,
        ref: 'User',
        required: true,
    },

    orderDate: {
        type: Date,
        default: Date.now
    },
    // quantity: {
    //     type: Number,
    // },

    rating: {
        type: Number,
        default: -1, // -1 means the order hasn't been rated yet
        range: [-1,5]
    },

    category : {
        type: String
    },
    subcategory: {
        type: String
    },
    orderDescription: {
        type: String
    }
});


const Order = mongoose.model(`Order`, OrderSchema);

export default Order;