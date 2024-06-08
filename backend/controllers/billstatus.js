import {
    getNewestId,
    insertBillStatus,
    getBillsByUser,
    getBillsByBill,
    getAll,
    updateStatus,
    updatePaid,
    cancelStatus
} from "../models/BillStatusModel.js";

import logger from '../utils/logger.js';

// get newest Bill Status
export const showNewestStatusId=(req,res)=>{
    getNewestId((err,results)=> {
        logger.info("Getting newest bill status id...");
        if (err) {
            logger.error(`Error in showing newest bill status id: ${err}`);
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create BillStatus
export const createBillStatus=(req,res)=>{
    const data = req.body;
    insertBillStatus(data,(err,results)=> {
        logger.info("Inserting bill status...");
        if (err) {
             logger.error(`Error in creating bill status: ${err}`);
            res.send(err);
        }else {
            logger.info("Bill status created successfully...");
            res.json(results);
        }
    });
};

// get Bills Status
export const getAllBillsByUser=(req,res)=>{
    getBillsByUser(req.params.id,(err,results)=> {
        logger.info("Getting all bills by user...");
        if (err) {
            logger.error(`Error in getting bill status: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all bills by user successfully...");
            res.json(results);
        }
    });
};

// get Bills Status
export const getAllBillsByBill=(req,res)=>{
    getBillsByBill(req.params.id,(err,results)=> {
        logger.info("Getting all bills by bill...");
        if (err) {
            logger.error(`Error in getting all bills by bill: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all bills by bill successfully...");
            res.json(results);
        }
    });
};

// get Bills Status
export const getAllBills=(req,res)=>{
    getAll((err,results)=> {
        logger.info("Getting all bills...");
        if (err) {
            logger.error(`Error in getting all bills: ${err}`);
            res.send(err);
        }else {
            logger.info("Got all bills successfully...");
            res.json(results);
        }
    });
};


// update Status
export const updateBillStatus=(req,res)=>{
    updateStatus(req.params.id,(err,results)=> {
        logger.info("Updating bill status...");
        if (err) {
            logger.error(`Error in updating bill status: ${err}`);
            res.send(err);
        }else {
            logger.info("Bill status updated successfully...");
            res.json(results);
        }
    });
};

// update Paid
export const updateBillPaid=(req,res)=>{
    updatePaid(req.params.id,(err,results)=> {
        logger.info("Updating bill paid...");
        if (err) {
            logger.error(`Error in updating bill paid: ${err}`);
            res.send(err);
        }else {
            logger.info("Bill paid updated successfully...");
            res.json(results);
        }
    });
};

// cancel Status
export const cancelBillStatus=(req,res)=>{
    cancelStatus(req.params.id,(err,results)=> {
        logger.info("Cancelling bill status...");
        if (err) {
            logger.error(`Error in cancelling bill status: ${err}`);
            res.send(err);
        }else {
            logger.info("Bill status cancelled successfully...");
            res.json(results);
        }
    });
};