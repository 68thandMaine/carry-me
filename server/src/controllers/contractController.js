const Contract = require('../models/Contract.model');

/**
 * @{params} - need entityId to find all or one contract
 * return - All of the contracts belonging to an entity.
 */
exports.index = (req, res) => {
  Contract.find().exec((err, contracts) => {
    if(err) {
      res.send('No Contracts were found in the DB');
    } else {
      res.send(contracts);
    }
  });
};