const Router = require('express').Router();
const driverController = require('../controllers/driverController.js');

Router.post('/driver', driverController.create);
Router.get('/driver/:driverId', driverController.show);

module.exports = Router;
