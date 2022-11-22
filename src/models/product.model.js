const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      require: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    price: {
      type: Number,
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
    brandId: {
      // type: String,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },
    // brand: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Brand"
    // },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
