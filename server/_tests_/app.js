const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

/** ROUTE FILES */
const contract = require('../src/routes/contract-routes.js');
const driver = require('../src/routes/driver-routes.js');
const entity = require('../src/routes/entity-routes.js');
const vehicle = require('../src/routes/vehicle-routes');

dotenv.config();

const MongoDB =  `${process.env.CARRYMEDB}`;

mongoose.connect(MongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(cors());

/** This handles requests to /carryme and anything that is listed in the Router file
If we wanted to define more modular routes we could split up the routes file into multiple
files for Entities and Drivers. Then we would use two app.use() statements for the differnt
files.
*/
app.use('/driver', driver);
app.use('/entity', entity);
app.use('/contract', contract);
app.use('/vehicle', vehicle);


module.exports = app;
