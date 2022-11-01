const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categoryShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
});

// add plugin that converts mongoose to json
categoryShema.plugin(toJSON);
categoryShema.plugin(paginate);

/**
 * @typedef Category
 */

const Category = mongoose.model('Category', categoryShema);

module.exports = Category;
