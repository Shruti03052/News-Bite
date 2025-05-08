require("dotenv").config();

const express=require('express');
const app=express()
const axios=require("axios")

const mongodb=require("./database")
mongodb();

app.use(express.json());
const cors=require('cors')
app.use(cors())

const api_url="https://newsapi.org/v2/top-headlines"
const api_key=process.env.api_key
const port=5000


app.get('/' ,(req,res)=> 
    {res.send("working")})
app.use('/api',require("./routes/newsController"));
app.use('/api',require("./routes/Signup"));
app.use("/api",require("./routes/login"));


app.listen(port,()=>{
   console.log("Listening on port 5000")
})