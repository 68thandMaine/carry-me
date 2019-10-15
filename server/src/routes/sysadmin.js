const Router = require('express').Router();

const contractController = require('../controllers/contractController.js');
const driverController = require('../controllers/driverController.js');
const entityController = require('../controllers/entityController.js');


/** ADMIN ROUTES */
Router.get('/admin/contract/', contractController.index);

module.exports = Router;
