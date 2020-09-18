import express from 'express';
import clients from './client.js';
import orders from './order.js';


const route = express.Router();

route.use('/api', clients);
route.use('/api', orders);


export default route;