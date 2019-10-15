const Router = require('express').Router();

const contractController = require('../controllers/contractController.js');
const driverController = require('../controllers/driverController.js');
const entityController = require('../controllers/entityController.js');


/** ADMIN ROUTES */
Router.get('/contract', contractController.index);
Router.get('/contract/:contractId', contractController.showOneContract);
Router.put('/contract/:contractId', contractController.update);
Router.delete('/contract/:contractId', contractController.delete);
Router.get('/entity', entityController.index);
Router.get('/entity/:id', entityController.show);
Router.put('/entity/:id', entityController.update);
Router.delete('/entity/:id', entityController.delete);
Router.get('/driver', driverController.index);
Router.get('/driver/:driverId', driverController.show);
Router.put('/driver/:driverId', driverController.update);
Router.delete('/driver/:driverId', driverController.delete);

module.exports = Router;
