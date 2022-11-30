const express = require('express');

const { handleUploadMutipleFile } = require('../../middlewares');

const { fileController } = require('../../controllers/admin');

const router = express.Router();

router.route('/').post(handleUploadMutipleFile.mutipleFile(), fileController.saveFile);

module.exports = router;
