import Joi from "joi";
import {Client} from '../models/client.js';
import { OK, NOT_FOUND, CREATED, BAD_REQUEST } from "../statusCode.js";



export const getClients = async(req,res) => {
    const clients = await Client.find();
    res.status(OK).send({status:OK,message:"All registered clients",clients});
};


export const createClient = async(req, res) => {

    const client = new Client({
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        tin: req.body.tin,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });

    try{
        const result = await client.save();
        res.status(CREATED).send({
            status:CREATED, message:"Client added successfully", result});
    }
    catch(ex){
        res.send(ex.message);
    }
};


export const updateClient = async (req, res) => {

    const client = await Client.findByIdAndUpdate(req.params.id,{ 
        clientName:req.body.clientName,
        companyName: req.body.companyName,
        phone: req.body.phone,
        new:true
    });
    if(!client) 
        return res.status(NOT_FOUND).send({
            status:NOT_FOUND,message:"Client with specified ID not found!"});
    
    try{
        res.status(OK).send({status:OK, message:"Client updated successfully", client});
    }
    catch(ex){
        res.send(ex.message);
    }

};


export const getClientById = async (req, res) => {
    const client = await Client.findById({_id:req.params.id});
    if(!client) return res.status(NOT_FOUND).send({status: NOT_FOUND,message:"Client with specified ID not found!"});
    res.status(OK).send({status:OK, message:"Client found!", client});
}


export const deleteClient = async(req, res) => {
    const client = await Client.findOneAndRemove({_id:req.params.id});
    if(!client) return res.status(NOT_FOUND).send({status:NOT_FOUND,message:"Client with specified ID not found!"});

    res.status(OK).send({status:OK, message:"Client deleted successfully"});
};
