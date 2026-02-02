const express =require('express');
const router=express.Router();
const multer=require('multer');

const authMiddleware=require("../middlewares/auth.middleware")
const foodController=require("../controllers/food.controller")


const upload =multer({
    storage: multer.memoryStorage(),
})
// this api will be protected becoz only only food partner 
// will be able to add food items so for making it protected 
// will use middleware 
//api/food
router.post('/',authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood);

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood)

router.post('/save', authMiddleware.authUserMiddleware,
    foodController.saveFood)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)


module.exports=router