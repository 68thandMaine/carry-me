const auth0 = require('../../lib/auth0');

module.exports.register = (server, serviceLocator) => {
  server.get('/entity', (req, res, next) => serviceLocator.get('entityController').index(req, res, next));
  server.post('/entity', (req, res, next) => serviceLocator.get('entityController').create(req, res, next));
  server.get('/entity/:id', (req, res, next) => serviceLocator.get('entityController').show(req, res, next));
  server.delete('/entity/:id', (req, res, next) => serviceLocator.get('entityController').delete(req, res, next));
  server.put('/entity/:id', (req, res, next) => serviceLocator.get('entityController').update(req, res, next));
};
