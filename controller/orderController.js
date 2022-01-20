import * as orderInterface from '../db/interface/orderInterface.js';
import * as userInterface from '../db/interface/userInterface.js';
import * as notificationInterface from '../db/interface/notificationInterface.js';
import * as categoryInterface from '../db/interface/categoryInterface.js';

/* eslint-disable */


const handlePOSTaddOrder = async(req, res, next) => {
    try {
        if (req.user.type != 'buyer' || req.user._id != req.body.buyer) {
            return res.status(400).send({
                data: null,
                status: 'OK',
                message: 'Non buyer types can not post orders for someone else',
            });
        }

        /**
         * Making sure that a buyer can not post order request more than 3 requests at the same time for a certain subcategory or Check if skiller and buyer has 1 active request or not 
         */
        // const skiller = await userInterface.getUserById( req.body.skiller );

        const count = await orderInterface.countUsersFromSameSubCategory( req.user._id, req.body.skiller,  req.body.subcategory );


        if( count.data >= 3 )
            return res.status(200).send({
                data: null,
                status: 'OK',
                message: "Buyer can't post request for this skiller now"
            });

        const categoryQueryResult = await categoryInterface.findCategoryFromSubcategory( req.body.subcategory );
        req.body.category = categoryQueryResult.data; // setting the category here since the data won't come from the frontend

        const orderQueryResult = await orderInterface.addOrder(req.body);
        if (orderQueryResult.status == 'OK') {
            res.locals.order = orderQueryResult.data;
            res.status(200).send(orderQueryResult);
            return next();
        }

        return res.status(400).send(orderQueryResult);
    } catch (e) {
        console.log('In handlePOSTaddOrder: ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

const handleGETallOrders = async(req, res, next) => {
    try {
        const orderQueryResult = await orderInterface.getAllOrdersForSpecificUser(
            req.params.userId
        );
        if (orderQueryResult.status == 'OK') {
            return res.status(200).send(orderQueryResult);
        }
        return res.status(400).send(orderQueryResult);
    } catch (e) {
        console.log('In handleGETallOrders : ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

const handleGETaSingleOrder = async(req, res, next) => {
    try {
        const orderQueryResult = await orderInterface.getASingleOrder(
            req.params.id
        );
        if (orderQueryResult.status == 'OK') {
            return res.status(200).send(orderQueryResult);
        }
        return res.status(400).send(orderQueryResult);
    } catch (e) {
        console.log('In handleGETaSingleOrder : ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

/**
 * @description this route changes the status for an order ('requested', 'accepted', 'completed','canceled','rejected')
 * @access - skiller ( accept / reject ), buyer ( cancel ), admin ( complete )
 * @route PUT /api/order
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const handlePUTChangeOrderState = async(req, res, next) => {
     console.log(req.body);

    try {

        const orderQueryResult = await orderInterface.changeOrderState({
            id: req.body.id,
            newStatus: req.body.status,
        }, {
            id: req.user._id,
            type: req.user.type
        });

        if (orderQueryResult.status == 'OK') {
            res.locals.order = orderQueryResult.data;
            res.status(200).send(orderQueryResult);
            return next();
            // return res.status(200).send(orderQueryResult);
        }

        return res.status(400).send(orderQueryResult);
    } catch (e) {
        console.log('In handlePUTChangeOrderState : ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

export { handlePOSTaddOrder, handleGETallOrders, handlePUTChangeOrderState, handleGETaSingleOrder };