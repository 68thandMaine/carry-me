const Driver = require('../models/Driver.model');
const Contract = require('../models/Contract.model');

exports.create = async (req, res) => {
  const newDriver = await new Driver(req.body).save();
  (newDriver) ? res.send(newDriver) : res.status(400).send('Some of the required fields are missing.');
};

exports.show = async (req, res) => {
  const driver = await Driver.findOne({
    _id: req.params.driverId,
  }, (err, foundDriver) => foundDriver);
  (driver) ? res.send(driver) : res.status(404).send('Driver ID not found.');
};

exports.showContracts = async (req, res)=> {
  const contracts = await Contract.find({ 
    driver: req.params.driverId
  }).exec((err, contract) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(contract);
    }
  });
};

exports.showOneContract = async (req, res) => {
  await Contract.findOne({
    _id: req.params.contractId,
  }, (err, foundContract) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(foundContract);
    }
  });
};

exports.update = async (req, res) => {
  await Driver.findByIdAndUpdate(req.params.driverId, req.body, {
    new: true,
    runValidators: true,
  }, (err, updatedDriver) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(updatedDriver);
    }
  });
};

exports.delete = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.driverId, (err) => {
    if (err) {
      res.send('something went wrong when deleting this driver.');
    } else {
      res.send('Successfully deleted driver.');
    }
  });
};

exports.index = async (req, res) => {
  Driver.find().exec((err, drivers) => {
    if (err) {
      res.send("This doesn't exist");
    } else {
      res.send(drivers);
    }
  });
};

