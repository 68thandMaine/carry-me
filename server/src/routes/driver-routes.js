const auth0 = require('../../lib/auth0');

module.exports.register = (server, serviceLocator) => {
  server.get('/driver', (req, res, next) => serviceLocator.get('driverController').index(req, res, next));
  server.get('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').show(req, res, next));
  // Used to view all current and past contracts.
  server.get('/driver/:driverId/contract/', (req, res, next) => serviceLocator.get('driverController').showContracts(req, res, next));
  // Used to accept a contract
  server.get('/driver/:driverId/contract/:contractId/', (req, res, next ) => serviceLocator.get('driverController').editContract(req, res, next));
  server.post('/driver', (req, res, next) => serviceLocator.get('driverController').create(req, res, next));
  server.delete('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').delete(req, res, next));
  server.put('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').update(req, res, next));
};
