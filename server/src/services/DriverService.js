class DriverService {
  constructor(log, mongoose, httpStatus) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
  }

  async listAllDrivers() {
    const Driver = this.mongoose.model('Driver');
    const drivers = await Driver.find();
    this.log.info(`${drivers.length} drivers returned from the database.`);
    return drivers;
  }

  async createDriver(body) {
    const Driver = this.mongoose.model('Driver');
    const { email } = body;
    const driver = await Driver.findOne({ email });
    if (driver) {
      return 'An account with the provided email already exists.';
    }
    let newDriver = new Driver(body);
    newDriver = await newDriver.save();
    this.log.info('Driver created successfully.');
    return newDriver;
  }

  async getDriverById(driverId) {
    const Driver = this.mongoose.model('Driver');
    const driver = await Driver.findOne({ _id: driverId });
    if (!driver) {
      this.log.error(`Driver with id - ${driverId} was not found in the database.`);
      return 'The driver was not found in the database.';
    }
    this.log.info('Driver fetched successfully.');
    return driver;
  }

  async deleteDriver(driverId) {
    const Driver = this.mongoose.model('Driver');
    const driver = await Driver.deleteOne({ _id: driverId });
    if(driver.deletedCount <= 0) {
      this.log.error(`Deletion failed: Driver with id - ${driverId} was not found in the database.`);
      return 'There was an error deleting this driver account.';
    }
    driver.message = 'Driver deleted successfully.';
    this.log.info(`Driver with id - ${driverId} was deleted successfully.`);
    return driver;
  }

  async updateDriver(driverId, body) {
    const Driver = this.mongoose.model('Driver');
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDriver) {
      this.log.error(`Driver could not be updated becasue id - ${driverId} was not found in the database.`);
      return 'Driver could not be updated. Invalid ID.';
    }
    this.log.info('Driver successfully updated.');
    return updatedDriver;
  }
}

module.exports = DriverService;
