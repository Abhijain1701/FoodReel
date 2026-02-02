const foodModel=require('../models/food.model');
const storageService=require('../services/storage.services');
const saveModel=require('../models/save.model')

const {v4: uuid}=require("uuid")

const likeModel=require('../models/likes.model')

async function createFood(req,res){
     
    console.log(req.foodPartner) // we are getting this food partner in req from middleware ..means we have setted foodpartner in req in middleware

    console.log(req.body)// THese 2 thing we arre getting from frontend 
    console.log(req.file)// and this is vedio file 

    const fileUploadResult=await storageService.uploadFile(req.file.buffer, uuid())
    console.log(fileUploadResult)

    //saving to db
    const foodItem=await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })

    res.status(201).json({
        message: "Food created successfully",
        food: foodItem
    })

    res.send("food item created")
}

async function getFoodItems(req,res){
    const foodItems=await foodModel.find({})
    res.status(200).json({
        message:"food items fetched sucessfully",
        foodItems
    })
}

async function likeFood(req,res){
    try {
        const {foodId}=req.body;
        const user=req.user;

        if(!user) {
            return res.status(401).json({message: "User not authenticated"})
        }

        if(!foodId) {
            return res.status(400).json({message: "Food ID is required"})
        }

        //adding condition that user can only like foode only once

        const isAlreadyLiked=await likeModel.findOne({
            user: user._id,
            food: foodId
        })

        if(isAlreadyLiked){
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId,{
                $inc: {likeCount: -1}
            })

            return res.status(200).json({
                message:"Food unliked successfully",
                like: false
            })
        }

        const like=await likeModel.create({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc: {likeCount: 1}
        })

        res.status(201).json({
            message:"Food liked",
            like: true
        })
    } catch(error) {
        console.log("Error in likeFood:", error)
        res.status(500).json({message: "Error liking food", error: error.message})
    }
}

async function saveFood(req,res)
{
    try {
        const {foodId}=req.body;
        const user =req.user;

        if(!foodId) {
            return res.status(400).json({message: "Food ID is required"})
        }

        const isAlreadySaved=await saveModel.findOne({
            food: foodId,
            user: user._id
        })

        if(isAlreadySaved)
        {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            })
            await foodModel.findByIdAndUpdate(foodId,{
                $inc :{saveCount:-1}
            })

            return res.status(200).json({
                message :"Food unsaved",
                save: false
            })
        }

        await saveModel.create({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{saveCount:1}
        })

        res.status(201).json({
            message: "Food saved",
            save: true
        })
    } catch(error) {
        console.log("Error in saveFood:", error)
        res.status(500).json({message: "Error saving food", error: error.message})
    }
}

async function getSaveFood(req,res){

    const user=req.user;
    const savedFoods=await saveModel.find({user: user._id}).populate('food');

    if(!savedFoods || savedFoods.length===0){
        return res.status(404).json({message:"No saved food found"})
    }

    // Extract just the food items
    const foods = savedFoods.map(item => item.food)

    res.status(200).json({
        message:"Saved foods retrieved",
        savedFoods: foods
    });

} 

module.exports={
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
}