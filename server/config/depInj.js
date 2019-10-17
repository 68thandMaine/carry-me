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

serviceLocator.register('entityService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const EntityService = require('../src/services/EntityService');

  return new EntityService(log, mongoose, httpStatus, errs);
});

module.exports = serviceLocator;
