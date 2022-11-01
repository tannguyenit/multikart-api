const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: null,
    },
    images: {
      type: Array,
      required: true,
      default: [],
    },
    description: {
      type: String,
      default: null,
    },
    brands: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
