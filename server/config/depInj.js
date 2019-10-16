const serviceLocator = require('../lib/service_locator');
const config = require('./config')();

serviceLocator.register('logger', () => {
  return require('../lib/logger').create(config.application_logging);
});
serviceLocator.register('httpStatus', () => {
  return require('http-status');
});
serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

module.exports = serviceLocator;
