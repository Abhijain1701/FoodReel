const foodPartnerModel=require('../models/foodpartner.model')
const foodModel=require('../models/food.model')

async function getFoodPartnerById(req,res){
    try{
        const foodPartnerId=req.params.id;

        const foodPartner =await foodPartnerModel.findById(foodPartnerId)

        if(!foodPartner){
            return res.status(404).json({message: "Food partner not found"})
        }

        const foodItemsByFoodPartner=await foodModel.find({foodPartner:foodPartnerId})

        res.status(200).json({
            message: "Food partner retrived successfully",
            foodPartner:{
                ...foodPartner.toObject(),
                foodItems:foodItemsByFoodPartner
            }

        });
    }
    catch(error){
        console.error("Error getting food partner:", error);
        res.status(500).json({message: "Error fetching food partner", error: error.message})
    }
}

module.exports={
    getFoodPartnerById
}