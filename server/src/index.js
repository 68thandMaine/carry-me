const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const express = require('express');
const morgan = require('morgan');

const config = require('../config/config')();
// const jSend = require('../lib/jsend');
const serviceLocator = require('../config/depInj');
const logger = serviceLocator.get('logger');

/** ROUTES */
const admin = require('../src/routes/admin-routes.js');
const contract = require('../src/routes/contract-routes.js');
const driver = require('../src/routes/driver-routes.js');
const entity = require('../src/routes/entity-routes.js');
const vehicle = require('../src/routes/vehicle-routes.js');

dotenv.config();

const Database = require('../config/database');
new Database(config.mongo.host, config.mongo.name);

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(cors());


app.use('/vehicle', vehicle);
contract.register(app, serviceLocator);
driver.register(app, serviceLocator);
entity.register(app, serviceLocator);
admin.register(app, serviceLocator);

const server = app.listen(config.app.port, () => {
  console.log(`${config.app.name} Server is running`);
});


module.exports = server;
