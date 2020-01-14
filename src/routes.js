const { Router } = require('express');
const routes = Router();
const storeDev = require('./controllers/DevController');

routes.get('/devs', storeDev.index);
routes.post('/devs', storeDev.store);
routes.put('/devs/:id', storeDev.update);
routes.delete('/devs/:id', storeDev.delete);
routes.get('/search', storeDev.search);



module.exports = routes;

