const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');

const Entity = require('../src/models/Entity.model');
const mockEntity = require('./mock-data/mock-entity');


const request = supertest(app);

// Test for 400 without complete post data
// Test for HTTP status code when not found
// Test for message from db if not found.
// Test the content type of the response


describe('Entity Endpoints', () => {
  beforeAll(async () => {
    const url = 'mongodb://localhost/test';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterEach(async () => {
    await Entity.deleteMany();
  });

  it('POST / Should save an Entity to the database', async (done) => {
    const res = await request.post('/carryme')
      .send(mockEntity[0])
      .set('Accept', 'application.json');
    expect(res.status).toBe(200);
    done();
    const entity = await Entity.findOne({ email: mockEntity[0].email });
    expect(entity.entityName).toBeTruthy();
    expect(entity.email).toBeTruthy();
    expect(entity.password).toBeTruthy();
    done();
  });
  it('POST / Should return validation error message if missing required properties', async (done) => {
    const res = await request.post('/carryme')
      .send(mockEntity[1]);
    expect(res.text).toBe('Entity validation failed');
    done();
  });
  it('GET / Should return empty with 200 status code if no Entities are in the DB', async () => {
    const res = await request.get('/carryme');
    expect(res.body.length).toBe(0);
    expect(res.status).toBe(200);
  });
  it('GET / Should return all entites in the DB', async () => {
    await Entity.insertMany(mockEntity[0]);
    const res = await request.get('/carryme');
    expect(res.body.length).toBe(1);
  });
  it('GET /:id should get one Entity', async () => {
    // Insert the one entry into the mock db.
    // Return the entry with the proven get method
    // Collect the ID from the return.
    await Entity.insertMany(mockEntity[0]);
    const entities = await request.get('/carryme');
    const entityID = entities.body[0]._id;

    // This is the actual test
    const res = await request.get(`/carryme/${entityID}`);
    console.log(res.body)
    
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toEqual(entityID);

  });
});
