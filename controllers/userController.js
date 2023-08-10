const asyncHandler = require("express-async-handler");
const User= require("../models/userModels");
const bcrypt= require("bcrypt");
//@desc Register a user
//@route Post /api/users/register
//@access public

const registerUser= asyncHandler(async(req,res)=>{
    const {username, email, password}= req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All field are mandatory")
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User alerdy registerd!")
    }
   /* when cleint send some password it will that password may be raw password and we 
    can not store raw password in database so that's why we use hash pasword 
    that's why we use be crypt library

   */

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data us not valid");
    }
     res.json({message:"Register the user"})
    
});

//@desc Login user
//@route Post /api/users/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    res.json({message:"login user"});
});
module.exports={registerUser,loginUser};