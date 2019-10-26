const Driver = require('../models/Driver.model');
const Contract = require('../models/Contract.model');

class DriverController {
  constructor(log, driverService, contractService, httpStatus) {
    this.log = log;
    this.driverService = driverService;
    this.contractService = contractService;
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
      const deleted = await this.driverService.deleteDriver(driverId);
      if (deleted.length > 0) {
        res.status(400).send(deleted);
      } else {
        res.send(deleted);
      }
      res.send(deleted);
    } catch (err) {
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

  async showContracts(req, res) {
    const { driverId } = req.params;
    try {
      const contracts = await this.contractService.showDriverContracts(driverId);
      this.log.info(`${contracts.length} contracts returned for driver with id ${driverId}.`);
      res.send(contracts);
    } catch (err) {
      this.log.error(`There was an error returning contracts for driver with id - ${driverId} because: ${err._message}`);
      res.status(400).send(err._message);
    }
  }

  async editContract(req, res) {
    const { driverId, contractId } = req.params;
    const { body } = req;
    try {
      const editedContract = await this.contractService.updateContract(contractId, body);
      this.log.info(`Contract with id - ${contractId} edited by driver with id - ${driverId}.`);
      res.send(editedContract);
    } catch (err) {
      this.log.error(`There was an error updating contract with id - ${contractId} for driver with id ${driverId} because ${err.message}.`);
      res.status(400).send(err.message);
    }
  }


// </driverControlle>
}

module.exports = DriverController;
