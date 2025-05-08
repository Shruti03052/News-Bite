const express=require('express')
const router=express.Router();
const axios=require('axios')

const api_key=process.env.API_KEY
const url="https://newsapi.org/v2/everything"
// const url="https://newsapi.org/v2/top-headlines?category=general"
//  console.log(api_key)
router.get("/news",async (req,res)=>{
    try{
//         console.log(req.query.q);
// console.log(req);

        const cat=req.query.q || "general"
    
    //   console.log(cat);
        const response=await axios.get(url,{
            params:{
                "apiKey":api_key,
                "q": cat,
                // "category":cat

            }
        });
        res.json(response.data)
    }
    catch(error){
        console.error(error.message)
        res

    }

})

module.exports=router
