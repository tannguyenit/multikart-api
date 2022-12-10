const { getImageThumbnail } = require('../../utils/app');
const getProductList = (data) => {
  const { results, ...meta } = data;
  const products = results.map(i => {
    const { price, description, _id, name, category, brand, createdAt, updatedAt, images } = i.toObject();
    return {
      price,
      description,
      _id,
      name,
      category: {
        name: category.name,
        _id: category._id
      },
      brand: {
        name: brand.name,
        _id: brand._id
      },
      createdAt,
      updatedAt,
      thumbnail: getImageThumbnail(images)
    };
  });

  return {
    results: products,
    ...meta
  };
};

module.exports = {
  getProductList
};
