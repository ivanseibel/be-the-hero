const dbConnection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ngo = await dbConnection('ngos')
      .select('name')
      .where({ id })
      .first();

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    return res.json(ngo);
  }
}