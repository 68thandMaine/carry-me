const serviceLocator = require('../lib/service_locator');
const logger = serviceLocator.get('logger');

class Database {
  constructor(port, host, name) {
    this.mongoose = serviceLocator.get('mongoose');
    this._connect(port, host, name);
  }

  _connect(port, host, name) {
    this.mongoose.Promise = global.Promise;
    this.mongoose.connect(`mongodb://${host}:${port}/${name}`);
    const { connection }  = this.mongoose;
    connection.on('connected', () => logger.info('Database connection was successful.'));
    connection.on('error', (err) => logger.error('Database Connection Failed: ' + err));
    connection.on('disconnected', () => logger.info('Database Connection Disconnected.'));
    process.on('SIGINT', () => {
      conneection.close();
      logger.info('Database Connection closed due to NodeJs process termination.');
      process.exit(0);
    });

    require('../src/models/Entity.model');
    require('../src/models/Contract.model');
    require('../src/models/Driver.model');
    require('../src/models/Vehicle.model');
  }
}

module.exports = Database;