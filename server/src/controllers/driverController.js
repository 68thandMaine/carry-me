const Driver = require('../models/Driver.model');

exports.create = async (req, res) => {
  const newDriver = await new Driver(req.body).save();
  (newDriver) ? res.send(newDriver) : res.status(400).send('Some of the required fields are missing.');
};
