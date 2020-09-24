import Joi from "joi";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import { BAD_REQUEST, UNAUTHORISED, FORBIDDEN, NOT_FOUND } from "../statusCode";
import { User } from "../models/user";





export const checkExistingUser = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(user){
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            message: 'User already exists'
        })
    }
    else{
       next();
    }
}


export const validateUserEntry = async (req, res, next) =>{
    const {error} = validateUser(req.body)
    if(error) {
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            message: error.details[0].message
        });
    }
    else {
        next();
    }
}

function validateUser(user){
    const schema = Joi.object({
        name : Joi.string().required().min(5).max(255),
        email : Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(8).max(25).uppercase(1),
        role: Joi.string()
    })
    return schema.validate(user);
}


export const validateUserLoginEntry = async (req, res, next) => {

    const{error} = validateUserLogin(req.body)
   if(error) {
    res.status(BAD_REQUEST).send({
        status: BAD_REQUEST,
        message: error.details[0].message
    });
   }
   else {
       next();
   }
}

function validateUserLogin(req) {
    const schema = Joi.object({
        email : Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(8).max(25).uppercase(1),
    });
    return schema.validate(req);
}


export const authUserLogin = async (req, res, next) => {
    const{email,password}=req.body;
    if(email && password){
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(BAD_REQUEST).send({
                status: BAD_REQUEST,
                message: 'Invalid email'
            });
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) {
                res.status(BAD_REQUEST).send({
                    status: BAD_REQUEST,
                    message: 'Invalid password'
                });
            }
            else{
                next();
            }
        }
    }
    else{
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            message: 'Invalid email or password'
        }); 
    }
}


export const authUserAccess = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token) return res.status(UNAUTHORISED).send({
        status: UNAUTHORISED,
        message: 'Access denied. No token provided'
    });
    else{
        try{
            const decoded = jwt.verify(token, process.env.secretkey);
            req.user=decoded
            if(decoded)
            next();
        }
        catch(err){
            res.status(BAD_REQUEST).send({
                status: BAD_REQUEST,
                message: 'Invalid token'
            });
        }
    }
}


export const adminAuth = async (req, res, next) => {
   const{user} = req
    if(user.role ==='Admin') {
        next();
    }
    else{
        return res.status(FORBIDDEN).send({
            status: FORBIDDEN,
            message: 'Access denied.'
        });
    }    
}


export const checkUserId = async(req, res, next) =>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'User with specified Id was not found'
        });
    }
    else{
        next();
    }
}