module.exports.register = (server, serviceLocator) => {
  server.post('/entity/:entityId/contract', (req, res, next) => serviceLocator.get('contractController').create(req, res, next));
  server.get('entity/:entityId/contract', (req, res, next) => serviceLocator.get('contractController').index_EntityContracts(req, res, next));
  server.get('entity/:entityId/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').show(req, res, next));
  server.put('entity/:entityId/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').update(req, res, next));
  server.delete('entity/:entityId/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').delete(req, res, next));
};
