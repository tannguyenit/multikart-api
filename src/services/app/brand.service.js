const httpStatus = require('http-status');
const { Brand } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a brand
 * @param {Object} brandBody
 * @returns {Promise<Brand>}
 */
const createBrand = async (brandBody) => {
  const { name } = brandBody;
  const brand = await Brand.findOne({ name });
  if (brand) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  return Brand.create(brandBody);
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
const queryBrands = async (filter, options) => {
  return Brand.paginate(filter, options);
};

const getBrandById = async (id) => {
  return Brand.findById(id);
};

const getAllBrands = async () => {
  return Brand.find();
};

/**
 * Delete brand by id
 * @param {ObjectId} brandId
 * @returns {Promise<Brand>}
 */
const deleteBrandById = async (brandId) => {
  const brand = await getBrandById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  await brand.remove();
  return brand;
};

const updateBrandById = async (brandId, updateBody) => {
  const brand = await getBrandById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }
  Object.assign(brand, updateBody);
  await brand.save();
  return brand;
};

module.exports = {
  createBrand,
  queryBrands,
  getAllBrands,
  getBrandById,
  deleteBrandById,
  updateBrandById,
};
