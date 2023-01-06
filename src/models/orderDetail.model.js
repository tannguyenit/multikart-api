const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderDetailSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    customerNote: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    shipingFee: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderDetailSchema.plugin(toJSON);
orderDetailSchema.plugin(paginate);

/**
 * @typedef OrderDetail
 */

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
