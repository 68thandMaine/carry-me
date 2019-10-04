const Contract = require('../models/Contract.model');

exports.index = async (req, res) => {
  await Contract.find().exec((err, contracts) => {
    if (err) {
      res.send("This doesn't exist");
    } else {
      res.send(contracts);
    }
  });
};

exports.create = async (req, res) => {
  const newContract = new Contract(req.body);
  await newContract.save().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
};

exports.showEntityContracts = async (req, res) => {
  await Contract.find({ entity: req.params.entityId }).exec((err, contract) => {
    if(err) {
      res.send(err._message);
    } else {
      res.send(contract);
    }
  });
};

exports.showOneContract = async (req, res) => {
  const contract = await Contract.findOne({
    _id: req.params.contractId,
  }, (err, foundContract) => foundContract);
  (contract) ? res.send(contract) : res.send('Resource not found.');
};

exports.update = async (req, res) => {
  await Contract.findByIdAndUpdate(req.params.contractId, req.body, {
    new: true,
    runValidators: true,
  }, (err, updatedContract) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(updatedContract);
    }
  });
};

exports.delete = async (req, res) => {
  await Contract.deleteOne({ _id: req.params.contractId }, (err) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send('Contract removed successfully!');
    }
  });
};