const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("./Schemas");
const jwt = require("jsonwebtoken");
const cloudinary = require("./Cloudinary");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/register",async (req,res)=>{
   try {
      const { firstName, lastName, email, password, cpassword } = req.body;
      if(!firstName || !lastName || !email || !password || !cpassword){
         res.status(422).json({"message":"Please fill your form properly"});
      } else {
         const userExist = await User.findOne({email:email})
            if(userExist){          
               res.status(422).json({"message":"User already exists"});
            } else if(!userExist && password===cpassword){
               const newUser = new User({
                  firstName: firstName,
                  lastName: lastName,
                  email:email,
                  password:password,
                  cpassword:cpassword
               })
               newUser.password = await bcrypt.hash(newUser.password,12);
               newUser.cpassword = await bcrypt.hash(newUser.cpassword,12);
               newUser.save();
               res.status(201).json({"message":"User successfully registered"});
            } else {
               res.status(422).json({"message":"password matching error"});
            }
      }
   } catch(error){
      res.status(500).json({"message":"Registration error"});
      console.log(error);
   }
})

router.post("/login",async(req,res)=>{
   try{
      const { email, password } = req.body;
      if(!email || !password){
         res.status(422).json({"message":"Please fill your form properly"})
      } else {
       const userExist = await User.findOne({email:email});
          if(!userExist){
             res.status(422).json({"message":"Invalid credentials"})
          } else if(userExist){
             const isMatch = await bcrypt.compare(password, userExist.password);
             if(!isMatch){
                res.status(422).json({"message":"Invalid Credentials"})
             } else if(isMatch) {
               const SK = process.env.SECRETKEY;
                const token = await jwt.sign({_id: userExist.id}, SK);
                userExist.tokens = userExist.tokens.concat({token: token});
                userExist.save();
                res.cookie("jwtoken",token);
                res.status(200).json({"message":"Logged in successfully"});
             }
             
          }
      }
   } catch (error){
      res.status(422).json({"message":"Invalid Credentials"});
      console.log(error);
   }
   
})

router.get("/profile",async(req,res)=>{
   try{
      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRETKEY);
      const userData = await User.findOne({_id:verifyToken._id,"tokens.token":token});
   if(!userData){
      res.status(400).json({"message":"User unauthorised"});
   } else {
      res.send(userData);
   }
   }catch(error){
      res.status(400).json({"message":"User unauthorised"});
      console.log(error);
   }
   
})

router.post('/uploads',async(req,res)=>{
   try{
      const encodedImage = req.body.data;
      const resp = await cloudinary.uploader.upload(encodedImage, {upload_preset: "socialmediaapp"});
      if(resp){
         const respUrl = resp.url;
         const token = req.cookies.jwtoken;
         const verifyToken = jwt.verify(token, process.env.SECRETKEY);
         const userData = await User.findOne({_id:verifyToken._id,"tokens.token":token});
         userData.images.push({image:respUrl});
         if(userData.images.length<11){
            userData.save();
         } else {
            res.status(400).json({"message":"Storage limit reached"});
         }
         res.status(200).json({"message":"Image uploaded"});
      }
   }catch(error){
      console.log(error);
   }
   
})

module.exports = router;