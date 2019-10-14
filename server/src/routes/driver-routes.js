const Router = require('express').Router();
const driverController = require('../controllers/driverController.js');

Router.post('/', driverController.create);
Router.get('/:driverId', driverController.show);
Router.get('/:driverId/contracts', driverController.showContracts);
Router.get('/:driverId/:contractId', driverController.showOneContract);
Router.put('/:driverId', driverController.update);
Router.delete('/:driverId', driverController.delete);

Router.get('/', driverController.index);

module.exports = Router;
