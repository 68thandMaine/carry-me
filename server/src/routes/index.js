const Router = require('express').Router();

const contractController = require('../controllers/contractController.js');
const entityController = require('../controllers/entityController.js');

/** ENTITY ROUTES */

Router.get('/', entityController.index);
Router.post('/', entityController.create);
Router.get('/:id', entityController.show);
Router.delete('/:id', entityController.delete);
Router.put('/:id', entityController.update);


/** CONTRACT ROUTES */

Router.post('/:entityId/contract', contractController.create);
Router.get('/:entityId/contract', contractController.showEntityContracts);
Router.get('/:entityId/:contractId', contractController.showOneContract);
Router.put('/:entityId/:contractId', contractController.update);
Router.delete('/:entityId/:contractId', contractController.delete);

/** ADMIN ROUTES */
Router.get('/admin/contract/', contractController.index);

module.exports = Router;
