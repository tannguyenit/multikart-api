const httpStatus = require('http-status');
const slugify = require('slugify');

const { Product, Category, Brand } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a product
 * @param {Object} body
 * @returns {Promise<Product>}
 */
const createProduct = async (body) => {
  const { name, categoryId, brandId } = body;
  const slug = slugify(name, { lower: true });
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist');
  }
  const brand = await Brand.findById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand does not exist');
  }
  const product = await Product.findOne({ slug });
  if (product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Product.create({ ...body, slug });
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

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  await product.remove();
  return product;
};

const updateProduct = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  deleteProductById,
  getProductBySlug,
  updateProduct,
};
