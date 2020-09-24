import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenvconfig from 'dotenv/config';
import { User } from "../models/user";
import _ from 'lodash';
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../statusCode";


export const getAllUsers = async (req, res) => {
    const users = await User.find().sort('name');

    try{
        res.status(OK).send({
            status: OK,
            message: 'All registered users from database', users
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}


export const createUser = async (req, res) => {
    const user = new User(_.pick(req.body, ['name', 'email','password','role']));

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = await jwt.sign({_id:user._id, email:user.email, role:user.role}, 
            process.env.secretkey, {expiresIn:86400});

        res.status(OK).send({
            status: OK, 
            message: 'User created successfully',token,user:_.pick(user, ['name','email','role'])
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message:err.message
        });
    }
}


export const loginUser = async(req, res) => {
    const user = new User(_.pick(req.body, ['email', 'password']));
    
    const token = await jwt.sign({_id:user._id,email:user.email, role:user.role}, 
        process.env.secretkey, {expiresIn:86400});
    try{
        res.status(OK).send({
            status: OK,
            message : 'User login successfully', auth: true, token, 
            user:_.pick(user, ['name','email','role'])
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message:err.message
        });
    }
}


export const getCurrentUser = async(req, res) =>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}



export const updateUser = async (req, res) =>{
    let user = await User.findOneAndUpdate({_id:req.params.id},{
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    });
    try{
       user = await user.save();
        res.status(OK).send({
            status: OK,
            message: 'User updated successfully', user
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}


export const deleteUser = async (req, res) =>{
    const user = await User.findOneAndRemove(req.params.id);
    try{
        res.status(OK).send({
            status: OK,
            message: 'User deleted successfully', user
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}


export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    try{
        res.status(OK).send({
            status: OK,
            message:'User found', user
        });
    }
    catch(err){
        res.status(INTERNAL_SERVER_ERROR).send({
            status: INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}