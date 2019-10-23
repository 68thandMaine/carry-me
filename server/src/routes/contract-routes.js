// const Router = require('express').Router();
// const contractController = require('../controllers/contractController.js');

// Router.post('/:entityId/contract', contractController.create);
// Router.get('/:entityId/contract', contractController.showEntityContracts);
// Router.get('/:entityId/:contractId', contractController.showOneContract);
// Router.put('/:entityId/:contractId', contractController.update);
// Router.delete('/:entityId/:contractId', contractController.delete);

module.exports.register = (server, serviceLocator) => {
  server.post('/:entityId/contract', (req, res, next) => serviceLocator.get('contractController').create(req, res, next));
  server.get('/:entityId/contract', (req, res, next) => serviceLocator.get('contractController').index_EntityContracts(req, res, next));
  server.get('/:entityId/:contractId', (req, res, next) => serviceLocator.get('contractController').show(req, res, next));
  server.put('/:entityId/:contractId', (req, res, next) => serviceLocator.get('contractController').update(req,res, next));
  server.delete('/:entityId/:contractId', (req, res, next) => serviceLocator.get('contractController').delete(req, res, next));
};
