'use strict';

process.env.SECRET = "toes";
const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('AUTH Routes', () => {
  it('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    
    const response = await mockRequest.post('/signup').send({ username: 'testadmin', password: 'password', role: 'admin' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.username).toEqual('testadmin');
    expect(response.body.user.role).toEqual('admin');
  });

  it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {

    const response = await mockRequest.post('/signin').auth('testadmin', 'password');
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.username).toEqual('testadmin');
  });
})

describe('V1 (Unauthenticated API) routes', () => {
  it('POST /api/v1/:model adds an item to the DB and returns an object with the added item', async () => {
    const response = await mockRequest.post('/api/v1/food').send({ name: 'Mango', calories: 100, type: 'FRUIT' });
    
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toEqual('Mango');
    expect(response.body.calories).toEqual(100);
    expect(response.body.type).toEqual('FRUIT');
  })

  it('GET /api/v1/:model returns a list of :model items', async () => {
    await mockRequest.post('/api/v1/food').send({ name: 'Broccoli', calories: 150, type: 'VEGETABLE' });
    const response = await mockRequest.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('Mango');
    expect(response.body[1].name).toEqual('Broccoli');
  })

  it('GET /api/v1/:model/ID returns a single item by ID', async () => {
    const tofu = await mockRequest.post('/api/v1/food').send({ name: 'Tofu', calories: 300, type: 'PROTIEN' });

    const response = await mockRequest.get(`/api/v1/food/${tofu.body._id}`);
    expect(response.body.name).toEqual('Tofu');
    expect(response.body._id).toEqual(tofu.body._id);
    expect(response.body.calories).toEqual(300);
    expect(response.body.type).toEqual('PROTIEN');
  })

  it('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
    const seitan = await mockRequest.post('/api/v1/food').send({ name: 'Seitan', calories: 500, type: 'PROTIEN' });

    const response = await mockRequest.put(`/api/v1/food/${seitan.body._id}`).send({ name: 'Tempeh', calories: 300, type: 'PROTIEN' });
    expect(response.body.name).toEqual('Tempeh');
    expect(response.body._id).toEqual(seitan.body._id);
    expect(response.body.calories).toEqual(300);
    expect(response.body.type).toEqual('PROTIEN');
  })

  it('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {
    const pepperoni = await mockRequest.post('/api/v1/food').send({ name: 'Pepperoni', calories: 200, type: 'PROTIEN' });
    const response = await mockRequest.delete(`/api/v1/food/${pepperoni.body._id}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Pepperoni');

    const getResponse = await mockRequest.get(`/api/v1/food/${pepperoni.body._id}`);
    expect(getResponse.body).toEqual(null);
  })
})

describe('V2 (Authenticated API Routes)', () => {
  it('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', async () => {

  })

  it('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items', async () => {

  })

  it('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID', async () => {

  })

  it('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID', async () => {

  })

  it('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', async () => {

  })
})
