/* eslint-disable */
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  payerId: {
    type: String,
    ref: 'User',
    required: true,
  },
  transactionId: {
    type: String,
    uppercase: true,
    maxlength: 12,
    unique: true,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },

  issueDate: {
    type: Date,
    default: Date.now,
  },

  confirmationDate: {
    type: Date,
  },
});

// TransactionSchema.pre('save', async function (next) {
//   const order = await this.model('Order').findById(this.orderId);

//   if (
//     this.payerId == order.skiller &&
//     this.amount == Math.floor((order.price * parseInt(process.env.RATE)) / 100)
//   ) {
//     next();
//   } else {
//     throw new Error(
//       'The id of the payer doesnt match the id of the skiller for this order'
//     );
//   }
// });

const Transaction = mongoose.model(`Transaction`, TransactionSchema);

export default Transaction;
