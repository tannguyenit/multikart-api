const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (res, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const dir = path.join(__dirname, '../../uploads/');

router.route('/').post(
  (req, res, next) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename, no-console
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    next();
  },
  upload.array('picture'),
  (req, res) => {
    const arrImages = req.files.map((item) => `/resources/images/${item.originalname}`);
    return res.success(arrImages);
  }
);

module.exports = router;
