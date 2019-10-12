const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');

const Contract = require('../src/models/Contract.model');
const Driver = require('../src/models/Driver.model');
const mockContracts = require('./mock-data/mock-contracts.js');
const mockEntities = require('./mock-data/mock-entity.js');
