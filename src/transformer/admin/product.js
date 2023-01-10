const { getImageThumbnail } = require('../../utils/app');

const getProductList = (data) => {
  const { results, ...meta } = data;
  const products = results.map((i) => {
    const { price, description, _id, name, category, brand, createdAt, updatedAt, images } = i.toObject();
    return {
      price,
      description,
      _id,
      name,
      category: {
        name: category?.name || null,
        _id: category?._id || null,
      },
      brand: {
        name: brand?.name || null,
        _id: brand?._id || null,
      },
      thumbnail: getImageThumbnail(images),
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
  getProductList,
};
