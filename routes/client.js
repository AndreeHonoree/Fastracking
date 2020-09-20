import express from 'express';
import {getClients, 
        getClientById, 
        updateClient, 
        deleteClient, 
        createClient} from '../controllers/client.js';
import { checkExistingClient, validateClientEntry } from '../middlewares/client.js';


const routes = express.Router();

routes.get('/clients', getClients);

routes.post('/clients',checkExistingClient, validateClientEntry, createClient);

routes.get('/clients/:id', getClientById);

routes.put('/clients/:id', validateClientEntry, updateClient);

routes.delete('/clients/:id',  deleteClient);

export default routes;