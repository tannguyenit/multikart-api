const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const auth = require('../../middlewares/auth');
const { roles } = require('../../config/roles');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
];

const privateRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

privateRoutes.forEach((route) => {
  router.use(route.path, auth(roles.admin), route.route);
});

module.exports = router;
