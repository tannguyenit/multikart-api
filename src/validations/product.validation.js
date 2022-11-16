const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.array().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().required(),
    brand: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    brand: Joi.string(),
    images: Joi.array(),
    description: Joi.string(),
    categoryId: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number(),
      brand: Joi.string(),
      images: Joi.array(),
      categoryId: Joi.string(),
      description: Joi.string().allow(null),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
