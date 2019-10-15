const Router = require('express').Router();
const vehicleController = require('../controllers/vehicleController');

Router.post('/:entityId/vehicle', vehicleController.create);

module.exports = Router;