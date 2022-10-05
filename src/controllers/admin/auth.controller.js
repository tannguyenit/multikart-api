const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { roles } = require('../../config/roles');
const { authService, userService, tokenService } = require('../../services/app');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(Object.assign(req.body, { role: roles.admin}));
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPasswordAndRole(email, password, roles.admin);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const me = catchAsync(async (req, res) => {
  res.send({ user: req.user })
});

module.exports = {
  register,
  login,
  logout,
  me,
};
