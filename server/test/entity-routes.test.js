process.env.NODE_ENV = 'test';
process.env.CARRYMEDB = 'mongodb://localhost/test';
process.env.PORT = 3001;

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../src/app');

const Entity = require('../src/models/Entity.model');
const mockEntity = require('./mock-data/mock-entity');

chai.use(chaiHttp);

describe('Entity Endpoints', () => {
  
})