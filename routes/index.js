import express from 'express';
import clients from './client.js';
import orders from './order.js';
import users from './user.js';


const route = express.Router();

route.use('/api', clients);
route.use('/api', orders);
route.use('/api', users);


export default route;