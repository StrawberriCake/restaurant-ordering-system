// import functions from Food model

import {
    getFoods,
    getFoodById,
    insertFood,
    updateFoodById,
    deleteFoodById,
} from "../models/FoodModel.js";

import logger from '../utils/logger.js';

// get all Foods
export const showFoods=(req,res)=>{
    getFoods((err,results)=> {
        logger.info("Getting all foods...");
        if (err) {
            logger.error(`Error in getting all foods: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all foods successfully...");
            res.json(results);
        }
    });
};


// get single Food
export const showFoodById=(req,res)=>{
    getFoodById(req.params.id,(err,results)=> {
        logger.info("Getting a single food by id...");
        if (err) {
            logger.error(`Error in getting a single food by id: ${err}`);
            res.send(err);
        }else {
            logger.info("Got a single food by id successfully...");
            res.json(results);
        }
    });
};

// create Food
export const createFood=(req,res)=>{
    const data = req.body;
    insertFood(data,(err,results)=> {
        logger.info("Creating a new food...");
        if (err) {
            logger.error(`Error in creating a new food: ${err}`);
            res.send(err);
        }else {
            logger.info("New food created successfully...");
            res.json(results);
        }
    });
};

// update Food
export const updateFood=(req,res)=>{
    const data = req.body;
    const id = req.params.id;
    updateFoodById(data,id,(err,results)=> {
        logger.info("Updating a food by id...");
        if (err) {
            logger.error(`Error in updating a food by id: ${err}`);
            res.send(err);
        }else {
            logger.info("Food updated successfully...");
            res.json(results);
        }
    });
};


// delete Food
export const deleteFood=(req,res)=>{
    const id = req.params.id;
    deleteFoodById(id,(err,results)=> {
        logger.info("Deleting a food by id...");
        if (err) {
            logger.error(`Error in deleting a food by id: ${err}`);
            res.send(err);
        }else {
            logger.info("Food deleted successfully...");
            res.json(results);
        }
    });
};