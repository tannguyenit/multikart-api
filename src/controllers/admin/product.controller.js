const pick = require('../../utils/pick');
const catchAsync = require('../../utils/catchAsync');
const { productService } = require('../../services/app');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.createSuccess(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'categoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.success(result);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteUserById(req.params.productId);
  res.success(true);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.productId, req.body);
  res.success(product);
});

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
