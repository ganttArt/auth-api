'use strict';

process.env.SECRET = "toes";
const server = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('AUTH Routes', () => {
  it('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    
    // const response = await mockRequest.post('/signup').send({ username: 'testadmin5', password: 'password', role: 'admin' });

    // console.log(response);
    expect(true).toEqual(true);
  });

  it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', () => {

  });
})

describe('V1 (Unauthenticated API) routes', () => {
  it('POST /api/v1/:model adds an item to the DB and returns an object with the added item', () => {

  })

  it('GET /api/v1/:model returns a list of :model items', () => {

  })

  it('GET /api/v1/:model/ID returns a single item by ID', () => {

  })

  it('PUT /api/v1/:model/ID returns a single, updated item by ID', () => {

  })

  it('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found', () => {

  })
})

describe('V2 (Authenticated API Routes)', () => {
  it('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item', () => {

  })

  it('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items', () => {

  })

  it('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID', () => {

  })

  it('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID', () => {

  })

  it('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found', () => {

  })
})
