const express=require('express')
const router=express.Router();
const axios=require('axios')

const api_key=process.env.API_KEY
const url="https://newsapi.org/v2/everything"

router.get("/news",async (req,res)=>{
    try{
        const cat=req.query.q || "general"
    
 
        const response=await axios.get(url,{
            params:{
                "apiKey":api_key,
                "q": cat,
                

            }
        });
        const data=response.data;
        console.log(data);
        res.json(response.data)
    }
    catch(error){
        console.error(error.message)
        res.sendStatus(500).json({error:"Failed to fectch news"});

    }

})

module.exports=router
