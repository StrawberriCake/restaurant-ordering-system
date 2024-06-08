import {
    insertBillDetails,
    getBillDetails
} from "../models/BillDetailsModel.js";

import logger from '../utils/logger.js';

// create BillDetails
export const createBillDetails=(req,res)=>{
    const data = req.body;
    logger.info("Creating bill details...");
    insertBillDetails(data,(err,results)=> {
        if (err) {
            logger.error(`Error in creating bill details: ${err}`);
            res.send(err);
        }else {
            logger.info("Bill details created successfully...");
            res.json(results);
        }
    });
};

// get BillDetails
export const getBillDetailsById=(req,res)=>{
    getBillDetails(req.params.id,(err,results)=> {
        logger.info("Getting bill details...");
        if (err) {
            logger.error(`Error in getting bill details: ${err}`);
            res.send(err);
        }else {
            res.json(results);
            logger.info("Got bill details successfully...");
        }
    });
};