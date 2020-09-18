import Joi from 'joi';
import {Order} from '../models/order.js';
import { OK, CREATED, NOT_FOUND, BAD_REQUEST } from '../statusCode.js';


export const getOrders = async (req, res) => {
    const orders = await Order
    .find()
    .populate('client','clientName companyName tin email phone -_id ')
    .select('id client productType');
    res.status(OK).send({
        status:OK, message:'All orders made are displayed from database', orders});
};


export const createOrder = async (req, res) => {

    const{error} = validateOrder(req.body);
    if(error) return res.status(BAD_REQUEST).send({
        status:BAD_REQUEST,
        message:error.details[0].message});

    const order = await new Order({
        client: req.body.client,
        productType: req.body.productType,
        isOrdered: req.body.isOrdered,
        price: req.body.price
    });
    try {
        const result = await order.save();
    res.status(CREATED).send({
        status: CREATED, message: 'Order has been created successfully', result});
    }
    catch(err){
        res.send(err.message);
    }
};


export const updateOrder = async (req, res) => {

    const{error} = validateOrder(req.body);
    if(error) return res.status(BAD_REQUEST).send({
        status:BAD_REQUEST,
        message:error.details[0].message});
        
    const order = await Order.findByIdAndUpdate((req.params.id),{
        productType: req.body.productType,
        isOrdered: req.body.isOrdered,
        new: true,
    });
    if(!order)
        return res.status(NOT_FOUND).send({status:NOT_FOUND, message:'Order with specified Id not found'});
    try{
        res.status(OK).send({status:OK, message:'Your order updated successfully', order});
    }
    catch(err){
        res.send(err.message);
    }
};


function validateOrder(order){
    const schema ={
        client : Joi.string().required(),
        productType: Joi.string().required(),
        isOrdered : Joi.boolean().required()
    }
    return Joi.validate(order, schema);
}



export const deleteOrder = async (req, res) =>{
    const order = await Order.findByIdAndRemove(req.params.id)
    if(!order)
        return res.status(NOT_FOUND).send({status:NOT_FOUND, message:'Order with specified Id not found'});

    res.status(OK).send({status:OK, message:'Your order has been deleted', order})
};


export const getOrderById = async (req, res) =>{
    const order = await Order
    .findById(req.params.id)
    .populate('client','clientName companyName tin email phone -_id ')
    .select('id client productType');
    if(!order)
        return res.status(NOT_FOUND).send({
            status:NOT_FOUND, message:'Order with specified Id not found'});
    res.status(OK).send({
        status:OK, message:'Order with specified ID was found', order});
};
