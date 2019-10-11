const Router = require('express').Router();

const contractController = require('../controllers/contractController.js');
const entityController = require('../controllers/entityController.js');

Router.get('/', entityController.index);
Router.post('/', entityController.create);
Router.get('/:id', entityController.show);
Router.delete('/:id', entityController.delete);
Router.put('/:id', entityController.update);

Router.get('/contract', contractController.index);
Router.post('/:entityId/contract', contractController.create);
Router.get('/:entityId/contract', contractController.showEntityContracts);
Router.get('/contract/:contractID', contractController.getOneContract);

module.exports = Router;
