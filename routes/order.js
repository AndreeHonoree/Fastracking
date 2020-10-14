import express from 'express';
import { createOrder,
         getOrders, 
         updateOrder, 
         deleteOrder, 
         getOrderById} from '../controllers/order.js';
import { checkExistingOrder, validateOrderEntry } from '../middlewares/order.js';
import { authUserAccess } from '../middlewares/user.js';



const router= express();

router.get('/orders', authUserAccess,getOrders);

router.post('/orders', checkExistingOrder, validateOrderEntry,createOrder);

router.put('/orders/:id', updateOrder);

router.delete('/orders/:id', deleteOrder);

router.get('/orders/:id', getOrderById);




export default router;