const Contract = require('../models/Contract.model');

exports.index = async (req, res) => {
  console.log('contractController');
};

// .exec((err, contracts) => {
//   if (err) {
//     res.send("This doesn't exist");
//   } else {
//     res.send(contracts);
//   }
// });

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

exports.getOneContract = async (req, res) => {
  await Contract.findOne({ _id: req.params.contractID }).exec((err, contract) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(contract);
      return contract;
    }
  });
};
