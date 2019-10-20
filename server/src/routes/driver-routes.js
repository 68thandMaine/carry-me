const auth0 = require('../../lib/auth0');
// Router.get('/:driverId/contracts', driverController.showContracts);
// Router.get('/:driverId/:contractId', driverController.showOneContract);


module.exports.register = (server, serviceLocator) => {
  server.get('/driver', (req, res, next) => serviceLocator.get('driverController').index(req, res, next));
  server.get('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').show(req, res, next));
  server.get('/:driverId/contracts', (req, res, next) => serviceLocator.get('driverController').showContracts(req, res, next));
  server.post('/driver', (req, res, next) => serviceLocator.get('driverController').create(req, res, next));
  server.delete('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').delete(req, res, next));
  server.put('/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').update(req, res, next));
};
