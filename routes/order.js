import express from 'express';
import { createOrder,
         getOrders, 
         updateOrder, 
         deleteOrder, 
         getOrderById} from '../controllers/order.js';



const router= express();

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/orders/:id', getOrderById);




export default router;