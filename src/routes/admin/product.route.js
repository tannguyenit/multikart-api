const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/admin/product.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(productValidation.getProducts), productController.getProducts)
  .post(validate(productValidation.createProduct), productController.createProduct);

router
  .route('/:productId')
  .delete(validate(productValidation.deleteProduct), productController.deleteProduct)
  .update(validate(productValidation.updateProduct), productController.updateProduct);

module.exports = router;
