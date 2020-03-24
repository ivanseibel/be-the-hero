const express = require('express');

const NGOController = require('./controllers/NGOController');
const IncidentController = require('./controllers/IncidentController');
const NGOIncidentsController = require('./controllers/NGOIncidentsController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/ngos', NGOController.create);
routes.get('/ngos', NGOController.index);
routes.get('/ngos/:id', NGOController.show);
routes.get('/ngo/incidents', NGOIncidentsController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/incidents/:id', IncidentController.show);

module.exports = routes;