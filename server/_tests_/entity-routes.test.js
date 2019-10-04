const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');

const Entity = require('../src/models/Entity.model');
const mockEntity = require('./mock-data/mock-entity');


const request = supertest(app);


describe('Entity Endpoints', () => {

  beforeAll(async (done) => {
    const url = 'mongodb://localhost/test';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(async (done) => {
    await Entity.deleteMany();
    done();
  });
  afterAll(async (done) => {
    mongoose.connection.close()
    done();
  });

  it('POST / Should save an Entity to the database', async (done) => {
    const res = await request.post('/carryme')
      .send(mockEntity[0])
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
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
  it('GET / Should return empty with 200 status code if no Entities are in the DB', async (done) => {
    const res = await request.get('/carryme');
    expect(res.body.length).toBe(0);
    expect(res.status).toBe(200);
    done();
  });
  it('GET / Should return all entites in the DB', async (done) => {
    await Entity.insertMany(mockEntity[0]);
    const res = await request.get('/carryme');
    expect(res.body.length).toBe(1);
    done();
  });
  it('GET /:id should get one Entity', async (done) => {
    // Insert the one entry into the mock db.
    // Return the entry with the proven get method
    // Collect the ID from the return.
    await Entity.insertMany(mockEntity[0]);
    const entities = await request.get('/carryme');
    const entityID = entities.body[0]._id;

    // This is the actual test
    const res = await request.get(`/carryme/${entityID}`);    
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toEqual(entityID);
    done();
  });
  it('DELETE /:id deletes an entity from the DB', async (done) => {
    await Entity.insertMany(mockEntity[0]);
    const entities = await request.get('/carryme');
    const entityID = entities.body[0]._id;

    const entity = await request.get(`/carryme/${entityID}`);
    const deleteUser = await request.delete(`/carryme/${entity.body._id}`);
    expect(deleteUser.statusCode).toBe(200);
    expect(deleteUser.text).toEqual('Deleted successfully');
    const notFound = await request.get(`/carryme/${entityID}`);
    expect(notFound.text).toEqual('Resource not found');
    done();
  });
  it('PUT /:id should update an entity', async (done) => {
    await Entity.insertMany(mockEntity[0]);
    const entities = await request.get('/carryme');
    const entityID = entities.body[0]._id;

    const updatedEntity = await request.put(`/carryme/${entityID}`)
      .send({
        entityName: 'Dope Grills',
      });
    expect(updatedEntity.statusCode).toBe(200);
    expect(updatedEntity.body.entityName).toBe('Dope Grills');
    expect(updatedEntity.body).not.toEqual({});
    done();
  });
  it('PUT /:id should return "Validation failed" if invalid entry', async (done) => {
    await Entity.insertMany(mockEntity[0]);
    const entities = await request.get('/carryme');
    const entityID = entities.body[0]._id;

    const updatedEntity = await request.put(`/carryme/${entityID}`)
      .send({
        entityName: '',
        email: '',
        password: '',
      });
    expect(updatedEntity.statusCode).toBe(400);
    expect(updatedEntity.text).toBe('Validation failed');
    expect(updatedEntity.body).toEqual({});
    done();
  });
});
