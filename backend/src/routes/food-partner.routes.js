const express=require('express')
const router=express.Router();
const foodPartnerController =require("../controllers/food-partner.controller")
const authMiddleware =require("../middlewares/auth.middleware");
// Get /api/food-partner/:id

router.get("/food-partner/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
)

module.exports=router;