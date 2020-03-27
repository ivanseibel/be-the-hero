const express = require('express');
const { Segments, Joi, celebrate } = require('celebrate');

const NGOController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const NGOIncidentsController = require('./controllers/NGOIncidentsController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// SESSION ROUTES
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().length(8).required(),
  }),
}), SessionController.create);


// NGO ROUTES
routes.post('/ngos', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().integer().required().min(1000000000).max(99999999999),
    city: Joi.string().required(),
    state: Joi.string().required().length(2),
  })
}), NGOController.create);

routes.get('/ngos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer(),
  }),

}), NGOController.index);

routes.get('/ngo/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), NGOIncidentsController.index);

// INCIDENT ROUTES
routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required().min(1),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer(),
  }),
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
}), IncidentController.delete);

module.exports = routes;
