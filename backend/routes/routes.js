// import express 
import express from "express";
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
} from "../controllers/food.js";

import {
    showAUser,
    createAccount
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails,getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus, 
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus
} from "../controllers/billstatus.js";

// init express router
const router = express.Router();

////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/v1/foods", showFoods);

// get single Food 
router.get("/api/v1/foods/:id", showFoodById);

// create Food
router.post("/api/v1/foods", createFood);

// update Food 
router.put("/api/v1/foods/:id", updateFood);

// delete Food
router.delete("/api/v1/foods/:id", deleteFood);



////////////////////////// USER ////////////////////////////////
// get all user
router.get("/api/v1/users/:email", showAUser);

// create account
router.post("/api/v1/users/", createAccount);



////////////////////////// CART ////////////////////////////////
// add to cart
router.post("/api/v1/cartItem", addItems);

// get a item in cart
router.get("/api/v1/cartItem/:user_id/:food_id", getItem);

// get all items by user id
router.get("/api/v1/cartItem/:id", allItems);

// update item qty
router.put("/api/v1/cartItem/", updateItem);

// delete a item in cart
router.delete("/api/v1/cartItem/:user_id/:food_id", deleteItem);

// delete all items in cart
router.delete("/api/v1/cartItem/:id", deleteItems);



////////////////////////// Booking ////////////////////////////////
router.post("/api/v1/booking", createBooking);



////////////////////////// Bill Details ////////////////////////////////
router.post("/api/v1/billdetails", createBillDetails);
router.get("/api/v1/billdetails/:id", getBillDetailsById);



////////////////////////// Bill Status ////////////////////////////////
router.get("/api/v1/billstatus/new", showNewestStatusId);
router.post("/api/v1/billstatus", createBillStatus);
router.get("/api/v1/billstatus/user/:id", getAllBillsByUser);
router.get("/api/v1/billstatus/bill/:id", getAllBillsByBill);
router.get("/api/v1/billstatus", getAllBills);
router.put("/api/v1/billstatus/:id", updateBillStatus);
router.put("/api/v1/billstatus/paid/:id", updateBillPaid);
router.put("/api/v1/billstatus/cancel/:id", cancelBillStatus);





// export default router
export default router;








