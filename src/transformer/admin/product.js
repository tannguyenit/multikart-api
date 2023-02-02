const { getImageThumbnail } = require('../../utils/app');
const baseUrl = process.env.APP_URL;

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

const getProduct = (data) => {
  const { price, description, _id, name, category, slug, brand, createdAt, updatedAt, images } = data;
  const imagesArr = images.map(i => `${baseUrl}/file${i}`);
  const products = {
    _id,
    price,
    images: imagesArr,
    description,
    name,
    category,
    brand,
    slug,
    createdAt,
    updatedAt
  };

  return {
    results: products,
  };
};

module.exports = {
  getProduct,
  getProductList,
};
