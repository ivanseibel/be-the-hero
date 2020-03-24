const dbConnection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;
    const { authorization: ngo_id } = req.headers;

    const ngo = await dbConnection('ngos').select('*').where({
      id: ngo_id
    });

    if (!ngo[0]) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    const [id] = await dbConnection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    })

    return res.json({ id });
  },

  async index(req, res) {
    const { page = 1 } = req.query;
    const limitOfRecords = 5;

    const incidents = await dbConnection('incidents')
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.whatsapp',
        'ngos.email',
        'ngos.city',
        'ngos.state'
      ])
      .innerJoin('ngos', 'ngo_id', 'ngos.id')
      .limit(limitOfRecords)
      .offset((page - 1) * limitOfRecords);

    const [count] = await dbConnection('incidents').count();

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { authorization: ngo_id } = req.headers;

    const incident = await dbConnection('incidents')
      .select('ngo_id')
      .where({ id })
      .first();

    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    if (ngo_id !== incident.ngo_id) {
      return res.status(401).json({ error: 'This incident does not belong to this NGO' });
    }

    const result = await dbConnection('incidents')
      .where({ id })
      .del();

    return res.status(204).send();
  },

  async show(req, res) {
    const { id } = req.params;

    const incident = await dbConnection('incidents').select('*').where({ id });

    if (!incident[0]) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    return res.json(incident[0]);
  }
}