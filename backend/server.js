// start server 
require('dotenv').config();

const app=require('./src/app');
const connectDB=require('./src/db/db')

connectDB(); // by calling this fun it will connect to db

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})