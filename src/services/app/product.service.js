const httpStatus = require('http-status');
const { Product } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  return Product.create(productBody);
};

/**
 * Query for product
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  return Product.paginate(filter, options);
};

const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteProductById = async (userId) => {
  const user = await getProductById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await user.remove();
  return user;
};

const updateProduct = async (userId, updateBody) => {
  const product = await getProductById(userId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  deleteProductById,
  updateProduct,
};
