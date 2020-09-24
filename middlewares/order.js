import Joi from 'joi';
Joi.objectId = require ('joi-objectid')(Joi);
import {Order} from '../models/order'
import { BAD_REQUEST } from "../statusCode";




export const checkExistingOrder = async (req, res, next) =>{
    const {clientId, productType, isOrdered} = req.body
    //const productType= req.body.productType
    
    const order = await Order.findOne({productType}, {clientId}, {isOrdered});
    if(order) {
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            message: 'Order already sent.', order
        });
    }
    else {
        next();
    }
}


export const validateOrderEntry = async (req, res, next) =>{

    const{error} = validateOrder(req.body);
    if(error) {
        return res.status(BAD_REQUEST).send({
            status:BAD_REQUEST,
            message:error.details[0].message
        });
    }
    else {
        next();
    }
}

function validateOrder(order){
    const schema = Joi.object({
        clientId : Joi.objectId().required(),
        productType: Joi.string().required(),
        isOrdered : Joi.boolean().required()
    });
    return schema.validate(order);
}