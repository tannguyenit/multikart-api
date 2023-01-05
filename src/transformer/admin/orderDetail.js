const { getImageThumbnail } = require('../../utils/app');

const getListOrdersDetailByOrderId = (data) => {
  const { results, ...meta } = data;

  const products = results.map((i) => {
    const { product, quantity, price, order, _id, createdAt, updatedAt } = i.toObject();

    return {
      _id,
      order,
      price,
      quantity,
      totalPrice: price * quantity,
      product: {
        name: product.name,
        _id: product._id,
        thumbnail: getImageThumbnail(product.images),
      },
      createdAt,
      updatedAt,
    };
  });

  return {
    results: products,
    ...meta,
  };
};

module.exports = {
  getListOrdersDetailByOrderId,
};
