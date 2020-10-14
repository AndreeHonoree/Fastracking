import { Client } from "../models/client"
import { OK, BAD_REQUEST, NOT_FOUND } from "../statusCode";
import Joi from "joi";
import _ from 'lodash';





export const checkExistingClient = async (req, res, next) => {
    const {clientName, companyName, tin} = req.body

    const client = await Client.findOne({clientName, companyName, tin});
    if(!client){
        next();
    }
    else {
       res.status(OK).send({
            status: OK,
            message : "Client already exists", 
            client:_.pick(client,['clientName','companyName','tin','email','phone'])
        }); 
    }
}


export const validateClientEntry = async (req, res, next) => {

    const {error} =  validateClient(req.body)
    if(error) {
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            message: error.details[0].message 
        });
    }
    else{
        next();
    }

}

function validateClient (client){
    const schema = Joi.object({
        clientName : Joi.string().min(4).max(255).required(),
        companyName: Joi.string().required().min(4).max(255),
        tin : Joi.number().required().min(1000).max(9999),
        email : Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(8).max(25).uppercase(1),
        phone : Joi.number().integer().required().min(1000000000).max(9999999999)
    });
    return schema.validate(client);
}


export const verifyClientId = async (req, res, next) => {
    const client = await Client.findById({_id:req.params.id})
    if(client){
        next();
    }
    else {
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'CLient with specified Id was not found'
        });
    }
}
