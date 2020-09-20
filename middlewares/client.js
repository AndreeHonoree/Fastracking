import { Client } from "../models/client"
import { OK, BAD_REQUEST } from "../statusCode";
import Joi from "joi";




export const checkExistingClient = async (req, res, next) => {
    const {clientName, companyName, tin, email, phone} = req.body

    const client = await Client.findOne({clientName, companyName, tin, email, phone});
    if(!client){

        next();
    }
    else {
       res.status(OK).send({
            status: OK,
            message : "Client already exists", client
        }); 
    }
}


export const validateClientEntry = async (req, res, next) => {

    const {error} = await validateClient(req.body)
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
        clientName : Joi.string().min(5).required(),
        companyName: Joi.string().required(),
        tin : Joi.number().required(),
        email : Joi.string().email().required(),
        phone : Joi.number().required().max(10)
    });
    return schema.validate(client,schema);
};