const path = require('path');
const multer = require('multer');
const fs = require('fs');

const mutipleFile = () => {
  const storage = multer.diskStorage({
    destination: (res, file, callback) => {
      callback(null, path.join(__dirname, '../../uploads/'));
    },
    filename: (res, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const dir = path.join(__dirname, '../../uploads/');
  const upload = multer({ storage });
  // eslint-disable-next-line security/detect-non-literal-fs-filename, no-console
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return upload.array('file');
};

module.exports = {
  mutipleFile,
};
