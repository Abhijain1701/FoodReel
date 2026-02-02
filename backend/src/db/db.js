//This folder and file is created to connect the server to db

const mongoose=require('mongoose');

//In this function we will write code that how our server 
// will connect to db
function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((err)=>{
        console.log("MongoDB connection error: ",err);
    })
}  

// Now this fun will be called in server js ..to get connect to db

module.exports=connectDB;