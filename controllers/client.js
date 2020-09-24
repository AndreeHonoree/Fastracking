import _ from 'lodash';
import {Client} from '../models/client.js';
import { OK, NOT_FOUND, CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../statusCode.js";



export const getClients = async(req,res) => {
    const clients = await Client.find();
    res.status(OK).send({
        status:OK,
        message:"All registered clients",clients
    });
};


export const createClient = async(req, res) => {

    const client = new Client(
        _.pick(req.body,['clientName','companyName','tin','email','password','phone']));

    try{
        await client.save();
        res.status(CREATED).send({
            status:CREATED, message:"Client added successfully",
            client:_.pick(client,['clientName','companyName','tin','email','phone'])
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};



export const updateClient = async (req, res) => {

    const client = await Client.findOneAndUpdate({_id:req.params.id},
        {client:_.pick(req.body,['clientName','companyName','tin','email','password','phone'])
    });
    try{
        await client.save();
        res.status(OK).send({status:OK, message:"Client updated successfully", client});
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }

};


export const getClientById = async (req, res) => {
    const client = await Client.findById({_id:req.params.id});
    try{
        res.status(OK).send({status:OK, message:"Client found!", client});
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}


export const deleteClient = async(req, res) => {
    const client = await Client.findOneAndRemove({_id:req.params.id});
    try{
        res.status(OK).send({status:OK, message:"Client deleted successfully"});
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
};
