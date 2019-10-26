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

// Service Files

serviceLocator.register('contractService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const ContractService = require('../src/services/ContractService');
  return new ContractService(log, mongoose, httpStatus);
});

serviceLocator.register('driverService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const DriverService = require('../src/services/DriverService');
  return new DriverService(log, mongoose, httpStatus);
});

serviceLocator.register('entityService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const EntityService = require('../src/services/EntityService')
  return new EntityService(log, mongoose, httpStatus);
});

// Controllers

serviceLocator.register('contractController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const contractService = serviceLocator.get('contractService');
  const ContractController = require('../src/controllers/contractController');
  return new ContractController(log, contractService, httpStatus);
});

serviceLocator.register('driverController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const driverService = serviceLocator.get('driverService');
  const contractService = serviceLocator.get('contractService');
  const DriverController = require('../src/controllers/driverController');
  return new DriverController(log, driverService, contractService, httpStatus);
});

serviceLocator.register('entityController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const entityService = serviceLocator.get('entityService');
  const EntityController = require('../src/controllers/entityController');
  return new EntityController(log, entityService, httpStatus);
});

module.exports = serviceLocator;
