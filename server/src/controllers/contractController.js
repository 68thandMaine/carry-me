class ContractController {
  constructor(log, contractService, httpStatus) {
    this.log = log;
    this.contractService = contractService;
    this.httpStauts = httpStatus;
  }

  async index(req, res) {
    try {
      const result = await this.contractService.listAllContracts();
      res.send(result)
    } catch (err) {
      this.log.error('There was an issue returning all contracts from the database.');
      res.send(err._message);
    }
  }

  async create(req, res) {
    const { entityId } = req.params;
    const { body } = req.body;
    try {
      const result = await this.contractService.createNewContract(body);
      this.log.info(`Contract for ${body.entityName} created.`)
      res.send(result);
    } catch (err) {
      this.log.error(`There was an error creating a contract for ${body.entityName} - ${err._message}`);
      res.send(err._message);
    } 
  }
}

module.exports = ContractController;

// exports.index = async (req, res) => {
//   await Contract.find().exec((err, contracts) => {
//     if (err) {
//       res.send("This doesn't exist");
//     } else {
//       res.send(contracts);
//     }
//   });
// };

/** 
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

*/