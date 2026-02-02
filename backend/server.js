// start server 
require('dotenv').config();

const app=require('./src/app');
const connectDB=require('./src/db/db')

connectDB(); // by calling this fun it will connect to db

app.listen(3000,()=>{
    console.log("Server is running on 3000");
})