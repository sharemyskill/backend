import User from '../models/User.js';
import Order from '../models/Order.js';

const addOrder = async(body) => {
    try {
        const newOrder = await Order.create({
            projectSize: body.projectSize,
            price: body.price,
            duration: body.duration,
            skiller: body.skiller,
            buyer: body.buyer,
            orderDetails: body.orderDetails,
            category: body.category,
            subcategory: body.subcategory,
            orderDescription: body.orderDescription
        });
        return {
            data: newOrder,
            status: 'OK',
            message: `New Order Added in DB`,
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

const getAllOrdersForSpecificUser = async(userId, findParams, sortBy) => {
    try {
        const allOrders = await Order.find(!findParams ? {} : findParams)
            .and([{ $or: [{ skiller: userId }, { buyer: userId }] }])
            .populate({
                path: 'skiller buyer',
            })
            .sort(sortBy);

        var dataCheck = { allOrders };

        let requestedOrder = [],
            acceptedOrder = [],
            completedOrder = [],
            canceledOrder = [],
            rejectedOrder = [];

        dataCheck.allOrders.forEach((item) => {
            if (item.orderStatus == 'requested') {
                requestedOrder.push(item);
            } else if (item.orderStatus == 'accepted') {
                acceptedOrder.push(item);
            } else if (item.orderStatus == 'canceled') {
                canceledOrder.push(item);
            } else if (item.orderStatus == 'rejected') {
                rejectedOrder.push(item);
            } else {
                completedOrder.push(item);
            }
        });

        const requestedOrderNo = requestedOrder.length;

        const acceptedOrderNo = acceptedOrder.length;

        const completedOrderNo = completedOrder.length;

        const canceledOrderNo = canceledOrder.length;

        const rejectedOrderNo = rejectedOrder.length;

        return {
            data: {
                requestedOrder: (acceptedOrderNo >= 5 )? [] : requestedOrder,
                acceptedOrder,
                completedOrder,
                canceledOrder,
                rejectedOrder,
                currentlyRequestedOrderCount: requestedOrderNo,
                currentlyAcceptedOrderCount: acceptedOrderNo,
                currentlyCompletedOrderCount: completedOrderNo,
                currentlyCanceledOrderCount: canceledOrderNo,
                currentlyrejectedOrderCount: rejectedOrderNo,
            },
            status: 'OK',
            message: `All Orders send for a specific User from the DB`,
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

const getASingleOrder = async(orderId) => {
    try {
        const orderResult = await Order
            .findById(orderId)
            .populate({
                path: 'skiller buyer',
                // select: 'name',
            });
        if (orderResult) {
            return {
                data: orderResult,
                status: 'OK',
                message: `Details Order for given orderID has been sent from database`,
            };
        }
        return {
            data: null,
            status: 'ERROR',
            message: `No Order for given orderID found from the database`,
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
 * @description list of searched orders
 * @returns orders - requested , accepted & completed
 */
const searchOrders = async(userId, text) => {
    try {
        const searchResult = await Order.find({
            $or: [{ skiller: userId }, { buyer: userId }],
        }).populate({
            path: 'buyer',
            // select: 'name',
            match: {
                name: new RegExp(text, 'i'),
            },
        });

        const result = [];

        searchResult.forEach((item) => {
            if (item.buyer != null) {
                result.push(item.buyer);
            }
        });

        if (result.length != 0) {
            return {
                data: result,
                status: 'OK',
                message: `All available user searched and found from the database`,
            };
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No users found from the database`,
        };
    } catch (e) {
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message,
        };
    }
};

/**
 * @param body will include the order id and the new status
 * @param user will include the caller id and the type
 * @access skiller will call to accept/cancel an order, buyer can reject and admin will make sure the order is completed
 * @returns
 */
const changeOrderState = async(body, user) => {
    try {
        let changedOrder;

        if (user.type == 'skiller') {
            changedOrder = await Order.findOneAndUpdate({
                _id: body.id,
                skiller: user.id,
            }, {
                orderStatus: body.newStatus,
            }, {
                new: true,
            });
        } else if (user.type == 'admin') {
            changedOrder = await Order.findByIdAndUpdate(
                body.id, {
                    orderStatus: 'completed',
                }, {
                    new: true,
                }
            );
        } else {
            changedOrder = await Order.findOneAndUpdate({
                _id: body.id,
                buyer: user.id,
            }, {
                orderStatus: 'canceled', // Seller will get notification
            }, {
                new: true,
            });
        }

        if (changedOrder) {
            return {
                data: changedOrder,
                status: 'OK',
                message: `Order state has been changed to the database`,
            };
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No order changed to the database`,
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
 * @description list of all loans
 * @returns all loans
 */
 const countUsersFromSameSubCategory = async( buyer , skiller , subcategory )=> {
    try {

        let orders = await Order.find({
            orderStatus: "requested",
            buyer,
            subcategory
        });

        for( const item of orders ){
            if( item.skiller == skiller ){
                // means there is already one request present for this skiller and buyer : status requested
                return {
                    data: 3, // sending it as 3 to keep consistency
                    status: 'OK',
                    message: `Request Present Already`
                }
            }
        }
        

        if( orders ){
            return {
                data: orders.length,
                status: 'OK',
                message: `Counts of user with same subcategory found from the database`
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: `Count could not be done`
        }
    }catch( e ){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}



/* eslint-disable */

/* eslint-disable */

/**
 * @description rejects requests that has crossed 2 day mark
 * @returns 
 */
 const rejectRequests = async( date )=> {
    try {
        const requests = await Order.updateMany({
            orderStatus: "requested",
            orderDate: {
                $lt: date
            }
        }, {
            $set: {
                orderStatus: "rejected"
            }
        },{
            multi: true
        })
        
        if( requests ){
            return {
                data: requests, 
                status: 'OK',
                message: `Request rejected from the database`
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No requests rejected from the database`
        }
    }catch( e ){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}



export {
    addOrder,
    getAllOrdersForSpecificUser,
    getASingleOrder,
    searchOrders,
    changeOrderState,
    countUsersFromSameSubCategory,
    rejectRequests
};