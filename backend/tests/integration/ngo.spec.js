const request = require('supertest');
const app = require('../../src/app');
const dbConnection = require('../../src/database/connection');

describe('NGO', () => {

  beforeEach(async () => {
    await dbConnection.migrate.rollback();
    await dbConnection.migrate.latest();
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: "Casa dos Gatinhos",
        email: "contato@casadosgatinhos.com.br",
        whatsapp: "99999999999",
        city: "Porto Alegre",
        state: "RS"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
