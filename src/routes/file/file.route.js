const express = require('express');
const multer = require('multer');
const path = require('path');

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

router.route('/').post(upload.array('picture'), (req, res) => {
  const arrImages = req.files.map((item) => `/resources/images/${item.originalname}`);
  return res.success(arrImages);
});

module.exports = router;
