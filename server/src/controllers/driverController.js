const Driver = require('../models/Driver.model');
const Contract = require('../models/Contract.model');


// exports.showContracts = async (req, res)=> {
//   const contracts = await Contract.find({
//     driver: req.params.driverId
//   }).exec((err, contract) => {
//     if (err) {
//       res.send(err._message);
//     } else {
//       res.send(contract);
//     }
//   });
// };

// exports.showOneContract = async (req, res) => {
//   await Contract.findOne({
//     _id: req.params.contractId,
//   }, (err, foundContract) => {
//     if (err) {
//       res.send(err._message);
//     } else {
//       res.send(foundContract);
//     }
//   });
// };


class DriverController {
  constructor(log, driverService, httpStatus) {
    this.log = log;
    this.driverService = driverService;
    this.httpStatus = httpStatus;
  }

  async index(req, res) {
    try {
      const result = await this.driverService.listAllDrivers();
      res.send(result);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.driverService.createDriver(body);
      res.send(result);
    } catch (err) {
      // Create custom logger function to get all the specifics behind the error.
      res.status(400)
        .send(err._message);
    }
  }

  async show(req, res) {
    try {
      const { driverId } = req.params;
      const foundDriver = await this.driverService.getDriverById(driverId);
      if (foundDriver.length > 0) {
        res.status(400).send(foundDriver);
      } else {
        res.send(foundDriver);
      }
    } catch (err) {
      res.send(err);
    }
  }

  async delete(req, res) {
    const { driverId } = req.params;
    try {
      console.log('in try')
      const deleted = await this.driverService.deleteDriver(driverId);
      if (deleted.length > 0) {
        res.status(400).send(deleted);
      } else {
        res.send(deleted);
      }
      res.send(deleted);
    } catch (err) {
      console.log('in catch', err)
      res.send(err._message);
    }
  }

  async update(req, res) {
    const { driverId } = req.params;
    const { body } = req;
    try {
      const updated = await this.driverService.updateDriver(driverId, body);
      if (updated.length > 0) {
        res.status(400).send(updated);
      } else {
        res.send(updated);
      }
    } catch (err) {
      res.send(err._message);
    }
  }
}

module.exports = DriverController;