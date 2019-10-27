module.exports.register = (server, serviceLocator) => {
  server.get('admin/entity', (req, res, next) => serviceLocator.get('entityController').index(req, res, next));
  server.get('admin/entity/:entityId', (req, res, next) => serviceLocator.get('entityController').show(req, res, next));
  server.put('admin/entity/:entityId', (req, res, next) => serviceLocator.get('entityController').update(req, res, next));
  server.delete('admin/entity/:entityId', (req, res, next) => serviceLocator.get('entityController').delete(req, res, next));

  server.get('admin/driver', (req, res, next) => serviceLocator.get('driverController').index(req, res, next));
  server.get('admin/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').show(req, res, next));
  server.put('admin/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').update(req, res, next));
  server.delete('admin/driver/:driverId', (req, res, next) => serviceLocator.get('driverController').delete(req, res, next));

  server.get('admin/contract', (req, res, next) => serviceLocator.get('contractController').index(req, res, next));
  server.get('admin/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').show(req, res, next));
  server.get('admin/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').update(req, res, next));
  server.delete('admin/contract/:contractId', (req, res, next) => serviceLocator.get('contractController').delete(req, res, next));
};
