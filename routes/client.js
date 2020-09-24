import express from 'express';
import {getClients, 
        getClientById, 
        updateClient, 
        deleteClient, 
        createClient} from '../controllers/client.js';
import { checkExistingClient, 
        validateClientEntry, 
        verifyClientId} from '../middlewares/client.js';
import { authUserAccess } from '../middlewares/user.js';


const routes = express.Router();

routes.get('/clients', getClients);

routes.post('/clients',checkExistingClient, validateClientEntry, createClient);

routes.get('/clients/:id',verifyClientId ,getClientById);

routes.put('/clients/:id', verifyClientId, validateClientEntry, updateClient);

routes.delete('/clients/:id',  authUserAccess, verifyClientId, deleteClient);

export default routes;