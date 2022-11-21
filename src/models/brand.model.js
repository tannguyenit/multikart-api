const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const brandShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    require: true,
  },
  logo: {
    type: String,
  },
});

// add plugin that converts mongoose to json
brandShema.plugin(toJSON);
brandShema.plugin(paginate);

/**
 * @typedef Brand
 */

const Brand = mongoose.model('Brand', brandShema);

module.exports = Brand;
