const dbConnection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const limitOfRecords = 5;

    const { authorization: id } = req.headers;

    const ngo = await dbConnection('ngos')
      .select('id').where({ id })

    if (!ngo[0]) {
      return res.status(404).json({ error: 'NGO not found' })
    }

    const incidents = await dbConnection('incidents')
      .select('*')
      .where({ ngo_id: id })
      .limit(limitOfRecords)
      .offset((page - 1) * limitOfRecords);

    return res.json(incidents);
  }
}