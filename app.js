import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); 
const app = express();
const port=process.env.PORT;

// For using Cors 
app.use(cors());


// Basic route 
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to our Socket App");

})

app.listen(port,()=>{
    console.log(`Server is Listening on Port ${port}`)
})