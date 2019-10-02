const Router = require('express').Router();

const entityController = require('../controllers/entityController.js');

Router.get('/', entityController.index);
Router.post('/', entityController.create);
Router.get('/:id', entityController.show);

module.exports = Router;
