const getImageThumbnail = (images) => {
  const baseUrl = process.env.APP_URL;

  if (Array.isArray(images)) {
    return `${baseUrl}/${images[0]}`;
  }

  return `${baseUrl}/${images}`;
};

module.exports = {
  getImageThumbnail
};
