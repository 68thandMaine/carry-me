const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Vehicle = require('../../src/models/Vehicle.model');
const mockEntity = require('../mock-data/mock-entity');
const mockVehicles = require('../mock-data/mock-vehicles');

const request = supertest(app);

describe('vehicle endpoints', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/vehcile';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(async (done) => {
    await Vehicle.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });
  it('POST /:entityId/vehicle will return 200 if a successful entry has been created in the db.', async (done) => {
    let entityID = mockEntity[0]._id;
    const res = await request.post(`/vehicle/${entityID}/vehicle`)
      .send(mockVehicles)
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    done();
  });
});
