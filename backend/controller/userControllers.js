const asyncHandler = require('express-async-handler');
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req,res) =>{
   const{name,email,password,pic}=req.body;

   if(!name || !email || !password){ // to check all the fields
    res.status(400);
    throw new Error ('Please Enter all the Fields');
   }

   const userExist = await User.findOne({email}); // mongoDB Query to find the email

   if(userExist){
    res.status(400);
    throw new Error("User already exists");
   }

   const user = await User.create({
    name,
    email,
    password,
    pic
   });

   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token: generateToken(user._id),
    });
   }
   else{
    res.status(400);
    throw new Error("User not found");
   }
});

const authUser =  asyncHandler (async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})
//api/users?search = Piyush

//searching 
const allUsers = asyncHandler(async (req,res)=>{
    const keyword = req.query.search ?{
        $or:[
            { name: { $regex: req.query.search, $options: "i" }}, //$regex is mongodb expression used for finding match 
            { email: { $regex: req.query.search, $options: "i" }},
            ],
    }
    :{};
    const users = await User.find(keyword).find({_id :{ $ne: req.user._id}});
    
        res.send(users);
});

module.exports = {registerUser , authUser , allUsers};