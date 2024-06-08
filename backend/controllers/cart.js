// import functions from User model

import {
    getAllItems,
    getAItem,
    insertToCart,
    updateCartItemQty,
    deleteItemInCart,
    deleteAllItemsByUser
} from "../models/CartModel.js";

import logger from '../utils/logger.js';

// get all Items
export const allItems=(req,res)=>{
    getAllItems(req.params.id,(err,results)=> {
        logger.info("Getting all items in cart...");
        if (err) {
            logger.errror(`Error in getting all items in cart: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all items in cart successfully...");
            res.json(results);
        }
    });
};

// get a Item
export const getItem=(req,res)=>{
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    getAItem(user_id,food_id,(err,results)=> {
        logger.info("Getting a single item in cart...");
        if (err) {
            logger.error(`Error in getting a single item in cart: ${err}`);
            res.send(err);
        }else {
            logger.info("Got a single item in cart successfully...");
            res.json(results);
        }
    });
};

// add to cart
export const addItems=(req,res)=>{
    const data = req.body;
    insertToCart(data,(err,results)=> {
        logger.info("Adding a new item to cart...");
        if (err) {
            logger.error(`Error in adding a new item to cart: ${err}`);
            res.send(err);
        }else {
            logger.info("New item added to cart successfully...");
            res.json(results);
        }
    });
};


// update Item
export const updateItem=(req,res)=>{
    const data = req.body;
    updateCartItemQty(data,(err,results)=> {
        logger.info("Updating a item in cart...");
        if (err) {
            logger.error(`Error in updating a item in cart: ${err}`);
            res.send(err);
        }else {
            logger.info("Updated a item in cart successfully...");
            res.json(results);
        }
    });
};


// delete a item in cart
export const deleteItem=(req,res)=>{
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    deleteItemInCart(user_id,food_id,(err,results)=> {
        logger.info("Deleting a item in cart...");
        if (err) {
            logger.error(`Error in deleting a item in cart: ${err}`);
            res.send(err);
        }else {
            logger.info("Deleted a item in cart successfully...");
            res.json(results);
        }
    });
};

// delete all items in cart
export const deleteItems=(req,res)=>{
    deleteAllItemsByUser(req.params.id,(err,results)=> {
        logger.info("Deleting all items in cart...");
        if (err) {
            logger.error(`Error in deleting all items in cart: ${err}`);
            res.send(err);
        }else {
            logger.info("Deleted all items in cart successfully...");
            res.json(results);
        }
    });
};
