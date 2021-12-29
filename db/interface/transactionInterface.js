import Transaction from '../models/Transaction.js';

const getATransactionById = async(trxId) => {
    try {
        const transaction = await Transaction.findById(trxId).populate({
            path: 'orderId payerId',
            // select: 'categoryName',
        });

        if (transaction) {
            return {
                data: transaction,
                status: 'OK',
                message: `Transaction found from the database`,
            };
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No Transaction found from the database`,
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

/**
 * @description list of all transactions
 * @returns all transactions
 */
const getAllTransactions = async(object) => {
    try {
        const transactions = await Transaction.find(object).sort({
            issueDate: -1,
        });

        if (transactions) {
            return {
                data: transactions,
                status: 'OK',
                message: `All Transactions have been found from the database`,
            };
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No transactions have been found from the database`,
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
 * @description this method adds the transaction to the database
 * @returns new transaction
 */
const createTransaction = async(body) => {
    try {
        const transaction = await Transaction.create(body);

        if (transaction) {
            return {
                data: transaction,
                status: 'OK',
                message: `Transaction added to the database`,
            };
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No transaction added to the database`,
        };
    } catch (e) {
        if (
            e.name === 'MongoServerError' &&
            e.code === 11000 &&
            e.keyPattern.transactionId
        ) {
            // Duplicate username
            return {
                data: 'duplicate',
                status: 'EXCEPTION',
                message: 'This transaction Id has been used before',
            };
        }
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message,
        };
    }
};

const changeTrxState = async(body, user) => {
    try {
        let changedTrx;
        if (user.type == 'admin') {
            changedTrx = await Transaction.findByIdAndUpdate(
                body.id, {
                    confirmed: body.newStatus, //True or False ; decided by admin
                }, {
                    new: true,
                }
            );
        }
        if (changedTrx) {
            return {
                data: changedTrx,
                status: 'OK',
                message: `Trx state has been changed to the database`,
            };
        }
        return {
            data: null,
            status: 'ERROR',
            message: `No Trx changed to the database`,
        };
    } catch (e) {
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message,
        };
    }
};
const deleteTransaction = async(trxId) => {
    try {
        deletedTrx = await Transaction.findByIdAndRemove(trxId);
        if (deletedTrx) {
            return {
                data: deletedTrx,
                status: 'OK',
                message: `Trx state has been DELETED from database`,
            };
        }
        return {
            data: null,
            status: 'ERROR',
            message: `No Trx Deleted from database`,
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
 const getTransactionsforOrder = async(orders)=> {
    try {
        const transaction = await Transaction.find({
            orderId: {
                $in: orders
            }
        });

        const result = transaction.reduce( function( map , obj ) {
            if( map[obj.orderId] == undefined || map[obj.orderId].issueDate < obj.issueDate){
                map[obj.orderId] = obj;
            }
            
            return map;
        },{});
        
        if( transaction ){
            return {
                data: result, 
                status: 'OK',
                message: `All transactions for this order has been found from the database`
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: `No transaction found from the database`
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
    getAllTransactions,
    createTransaction,
    getATransactionById,
    changeTrxState,
    deleteTransaction,
    getTransactionsforOrder
};