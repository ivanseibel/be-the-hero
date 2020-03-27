const crypto = require('crypto');

const dbConnection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, state } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await dbConnection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state
    });

    return res.json({ id });
  },

  async index(req, res) {
    const { page = 1 } = req.query;
    const limitOfRecords = 5;

    const ngos = await dbConnection('ngos')
      .select('*')
      .orderBy('name')
      .limit(limitOfRecords)
      .offset((page - 1) * limitOfRecords);

    return res.json(ngos);
  }
}
