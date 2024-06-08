// import functions from User model

import {
    getAllUser,
    getUserByEmail,
    insertUser
} from "../models/UserModel.js";

import logger from '../utils/logger.js';

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
    logger.info("Getting all users...");
        if (err) {
            logger.error(`Error in getting all users: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all users successfully...");
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.email,(err,results)=> {
        logger.info("Getting a single user by email...");
        if (err) {
            logger.error(`Error in getting a single user by email: ${err}`);
            res.send(err);
        }else {
            logger.info("Got a single user by email successfully...");
            res.json(results);
        }
    });
};

// create user
export const createAccount=(req,res)=>{
    logger.info("Creating a new user account...");
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            logger.error(`Error in creating a new user account: ${err}`);
            res.send(err);
        }else {
            logger.info("New user account created successfully...");
            res.json(results);
        }
    });
};




