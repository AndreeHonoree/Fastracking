import express from 'express';
import {getClients, 
        getClientById, 
        updateClient, 
        deleteClient, 
        createClient} from '../controllers/client.js';


const routes = express.Router();

routes.get('/clients', getClients);

routes.post('/clients', createClient);

routes.get('/clients/:id', getClientById);

routes.put('/clients/:id', updateClient);

routes.delete('/clients/:id',  deleteClient);

export default routes;