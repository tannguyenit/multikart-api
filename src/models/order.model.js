const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    billingAddress: {
      type: String,
      require: true,
    },
    amount: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
