const { getImageThumbnail } = require('../../utils/app');

const getListOrdersDetailByOrderId = (data) => {
  const { results, ...meta } = data;

  // eslint-disable-next-line no-console
  console.log(results);

  const products = results.map((i) => {
    const { product, discount, shipingFee, customerNote, quantity, price, order, _id, createdAt, updatedAt } = i.toObject();

    return {
      _id,
      order,
      price,
      quantity,
      discount,
      shipingFee,
      customerNote,
      totalPrice: price * quantity,
      product: {
        name: product?.name || null,
        _id: product?._id || null,
        thumbnail: getImageThumbnail(product?.images) || null,
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
