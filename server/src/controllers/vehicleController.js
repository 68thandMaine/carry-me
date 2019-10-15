const Vehicle = require('../models/Vehicle.model');

exports.create = async (req, res) => {
  const vehicle = new Vehicle(
    req.body,
  );
  await vehicle.save((err, savedVehicle) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(savedVehicle);
    }
  });
};
