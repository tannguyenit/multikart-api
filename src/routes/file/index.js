const express = require('express');

const fileRoute = require('./file.route');
const auth = require('../../middlewares/auth');
const { roles } = require('../../config/roles');

const router = express.Router();

const uploadFileRoutes = [
  {
    path: '/',
    route: fileRoute,
  },
];

uploadFileRoutes.forEach((route) => {
  router.use(route.path, auth(roles.admin), route.route);
});

module.exports = router;
