const express=require("express")
const User=require("../models/schema")
const router= express.Router();
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const{OAuth2Client} =require("google-auth-library");

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async(req,res)=>{
    try{
        const {tokenId}=req.body;
        const ticket=await client.verifyIdToken({
            idToken:tokenId,
            audience:process.env.GOOGLE_CLIENT_ID
        });

        const{email,name,sub:googleId}=await ticket.getPayload();
        const user=await User.findOne({email});
        if(!user){
            const newUser=new User({email,name,googleId});
            await newUser.save();

        }
        const savedUser=user || newUser;
        
        const authToken=jwt.sign({userId: user._id},
            process.env.SECRET_KEY,
            {expiresIn:"7d"});
            res.status(200).json({token:authToken,message:"Logged in successfully",
                user:{
                    _id: savedUser._id,
                    name: savedUser.name,
                    email:savedUser.email

                }
            });
    

    }
    catch(error){
        console.log(error);
    }
   
});


router.post("/login",
    async(req,res)=>{
        const {email,password}=req.body;

        try{
            
            let user=await User.findOne({email})
            if(!user){
                return res.status(400).json({message:"User not found"});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid password"});
            }



            // if(password != user.password){
            //     return res.status(400).json({message:"Invalid password"});
            // }
            const authToken=jwt.sign({userId:user._id},process.env.SECRET_KEY,
                {expiresIn:"7d"});
            
            return res.status(200).json({message:"Logged in Successfully",token:authToken,
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email

                }
            });
        

        }
        catch(error){
            console.log(error);
        }
   

    }
)
module.exports=router

