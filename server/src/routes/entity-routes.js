const Router = require('express').Router();

// const entityController = require('../controllers/entityController.js');

// Router.get('/', entityController.index);
// Router.post('/', entityController.create);
// Router.get('/:id', entityController.show);
// Router.delete('/:id', entityController.delete);
// Router.put('/:id', entityController.update);

// module.exports = Router;

module.exports.register = (server, serviceLocator) => {
  server.get('/entity', (req, res, next) => serviceLocator.get('entityController').index(req, res, next));
  server.post('/entity', (req, res, next) => serviceLocator.get('entityController').create(req, res, next));
  server.get('/entity/:id', (req, res, next) => serviceLocator.get('entityController').show(req, res, next));
  server.delete('/entity/:id', (req, res, next) => serviceLocator.get('entityController').delete(req, res, next));
  server.put('/entity/:id', (req, res, next) => serviceLocator.get('entityController').update(req, res, next));
};