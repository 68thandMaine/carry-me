const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Router = require('./routes/index.js');

dotenv.config();

const MongoDB =  `${process.env.CARRYMEDB}`;

mongoose.connect(MongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // console.log('mongoose up');
  // we're connected!
});

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
app.use('/carryme', Router);

app.get('/', (req, res) => {
  res.send('Carry-Me Server');
});

const server = app.listen(process.env.PORT);
module.exports = server;
