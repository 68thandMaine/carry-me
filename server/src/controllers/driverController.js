const Driver = require('../models/Driver.model');

exports.create = async (req, res) => {
  console.log('driver controller create');
  const newDriver = await new Driver(req.body).save();
  (newDriver) ? res.send(newDriver) : res.status(400).send('Some of the required fields are missing.');
};

exports.show = async (req, res) => {
  console.log('driver controller show');
  const driver = await Driver.findOne({
    _id: req.params.driverId,
  }, (err, foundDriver) => foundDriver);
  console.log(driver)
  (driver) ? res.send(driver) : res.status(404).send('Driver ID not found.');
};
