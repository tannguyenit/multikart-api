const httpStatus = require('http-status');

const customResponse = (req, res, next) => {
  /**
   * (default status 200)
   * Success response
   */
  res.success = function(data = {}, message = '') {
    return res.json({
      status: true,
      data,
      message,
      errors: null
    });
  };

  /**
   * (default status 201)
   * Success response
   * @param data
   * @param message
   */
  res.createSuccess = function(data = {}, message = '') {
    return res.status(httpStatus.CREATED).json({
      status: true,
      data,
      message,
      errors: null
    });
  };

  /**
   * (default status 204)
   * Success response
   * @param data
   * @param message
   */
  res.successNoContent = function(data = {}, message = '') {
    return res.status(httpStatus.NO_CONTENT).json({
      status: true,
      data,
      message,
      errors: null
    });
  };

  /**
   * Custom error response
   */
  res.error = function(message = '', errors = {}) {
    return res.json({
      status: false,
      data: null,
      message,
      errors
    });
  };

  /**
   * (status 403)
   * Forbidden request response
   */
  res.forbidden = function(message = '', errors = {}) {
    return res.status(403).error({
      status: false,
      data: null,
      message,
      errors
    });
  };

  /**
   * (status 401)
   * Unauthorize request response
   */
  res.unauthorize = function(message = '', errors = {}) {
    return res.status(401).error({
      status: false,
      data: null,
      message,
      errors
    });
  };

  /**
   * (status 500)
   * Internal request response
   */
  res.internalError = function(message = '', errors = {}) {
    return res.status(500).error({
      status: false,
      data: null,
      message,
      errors
    });
  };

  next();
};

module.exports = customResponse;
