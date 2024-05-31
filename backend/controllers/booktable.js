import {
    insertBooking
} from "../models/BookTableModel.js";

import logger from '../utils/logger.js';

// create Booking
export const createBooking=(req,res)=>{
    const data = req.body;
    insertBooking(data,(err,results)=> {
        logger.info("Creating a new booking...");
        if (err) {
            logger.error(`Error in creating a new booking: ${err}`);
            res.send(err);
        }else {
            logger.info("New booking created successfully...");
            res.json(results);
        }
    });
};