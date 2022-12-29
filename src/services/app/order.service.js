const httpStatus = require('http-status');

const { Order } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a order
 * @param {Object} body
 * @returns {Promise<Order>}
 */
const createOrder = async (body) => {
  return Order.create(body);
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  return Order.paginate(filter, options);
};

/**
 * Get order detail by Id
 * @param id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  await order.remove();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
};
