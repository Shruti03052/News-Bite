const express=require("express")
const User=require("../models/schema")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt")


router.post("/signup",
    [body('email','Invalid email').isEmail(),
    body('password','Password should be atleast 3 characters long').isLength({min:3})],



    async(req,res)=>{
        try{
            const error=validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({errors:error.array()});

            }


            const name=req.body.name
            const password=req.body.password
            const email=req.body.email

            let already_exists=await User.findOne({email});
            // console.log(already_exists)
            if(already_exists){
                res.status(400).json({message:"User already exists"})

            }
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            new_user=new User({name,email,password:hashedPassword});
            await new_user.save()
            res.status(201).json({message:"Account created Successfully!!"})


        }
        catch(error){
            console.log(error)
        }

    }

)
module.exports=router