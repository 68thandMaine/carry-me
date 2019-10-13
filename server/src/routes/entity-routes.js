const Router = require('express').Router();

const entityController = require('../controllers/entityController.js');

Router.get('/', entityController.index);
Router.post('/', entityController.create);
Router.get('/:id', entityController.show);
Router.delete('/:id', entityController.delete);
Router.put('/:id', entityController.update);

module.exports = Router;