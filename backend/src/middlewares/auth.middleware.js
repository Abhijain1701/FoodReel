const foodPartnerModel=require("../models/foodpartner.model")
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model")

async function authFoodPartnerMiddleware(req,res,next){

    const token=req.cookies.token;
    if(!token){
        res.status(401).json({
          message:"Pls login first"
        })
    }

    try{

        // checking if token is correct or not 
       const decoded= jwt.verify(token,process.env.JWT_SECRET);
       const foodPartner =await foodPartnerModel.findById(decoded.id);

       req.foodPartner=foodPartner  
       next()    

    }catch(err)
    {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}


//user middleware to check if user is logged in or not
async function authUserMiddleware(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }

    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // token is verifed ..and token contains id ..so from token we will find user
        let user=await userModel.findById(decoded.id);

        // If not found in user, check food partner
        if(!user){
            user=await foodPartnerModel.findById(decoded.id);
        }

        if(!user){
            return res.status(401).json({
                message:"Account not found"
            })
        }

        req.user=user
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

// Middleware that allows both users AND food partners to access
async function authAnyMiddleware(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        // Try to find as user first
        const user=await userModel.findById(decoded.id);
        if(user){
            req.user=user
            return next()
        }

        // If not user, try food partner
        const foodPartner=await foodPartnerModel.findById(decoded.id);
        if(foodPartner){
            req.user=foodPartner  // Use same field so controller works
            req.foodPartner=foodPartner
            return next()
        }

        return res.status(401).json({
            message:"Account not found"
        })
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware,
    authAnyMiddleware
}