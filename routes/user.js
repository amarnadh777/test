const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bycrpt = require("bcryptjs");
const uuid = require('uuid')
const jwt = require("jsonwebtoken");
const booking = require("../models/booking");
const pdfDocument = require("pdfkit")
const fs = require('fs')
const hotel = require('../models/hotel')
const doc = new pdfDocument()
const uploader = require("../utils/multer");
const { image } = require("../utils/cloudinary");
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dati6fdzg', 
    api_key: '589318217265841', 
    api_secret: 'N6xBiWob6WnUsFLpmCVZOk9qym4'
    
  });
  console.log("colundinary configration success")
router.post("/register",uploader.single("image"), async (req, res) => {
  try {
   
    
    console.log(req.file)
  console.log(req.body)
  const imgresponse = await cloudinary.uploader.upload(req.file.path)
  const imgurl = imgresponse.url
   /* const { username, password,email,mobilenumber,address } = req.body;
    if (!username || !password || !email || !mobilenumber  ) {
      return res.status(400).json({status:"please enter all feilds" });
    }
    const userexist = await user.findOne({ username: username });
    if (userexist) {
      return res.status(400).json({status:"user already exist" });   
    }
    const imgresponse = await cloudinary.uploader.upload(req.file.path)
    const imgurl = imgresponse.url
    console.log(imgurl)
    const salt = await bycrpt.genSalt();
    const hashpassword = await bycrpt.hash(password, salt);
    const userId = await uuid.v4()
    const newUser = new user({ username: username, password: hashpassword ,userId:userId , email:email,mobilenumber:mobilenumber,address:address,profileurl:imgurl });
    const saveUser = await newUser.save();
    */
    //res.status(200).json({ status: "user created successfully" ,data:{userId:userId,username:username}});
    res.status(200).json(imgresponse)
  } catch (error) {
    res.status(400).json({ status: "some thing went wrong" });
    console.log(error)
  }
});
router.get("/getuser", async (req, res) => {
  try {
    const userData = await user.find({});
    res.json(userData).status(200);
  } catch (error) {
    
    res.json({ status: "some thibg went wrong" }).status(400);
   
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {

      const userData = await user.findOne({userId:req.params.id},'username userId email mobilenumber profileurl').exec()
      return res.status(200).json(userData);
   
  } catch (error) {
    console.log(error)
    return res.status(401).json({ status: "some thibg went wrong" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await user.findOne({ username: username });
    if (!userData) {
      return res.status(400).json({ status: "user doesnot exist" });
    }
    const userpassword = userData.password;

    const checkpass = await bycrpt.compare(password, userpassword);
    if (!checkpass) {
      return res.status(400).json({ status: "password is incorrect" });
    }
    const tokken = jwt.sign({ id: userData._id }, "9020806654");
    res
      .status(200)
      .json({ status: "user logined", tokken, userId: userData.userId ,username:username});
  } catch (error) {
    res.status(400).json({ status: "some thing went wrong" });
  }
});
 
router.get("/getmybookings/:id",async (req,res) =>
{
  const userId = req.params.id
 const myhotels = await booking.find({userId:{$eq:userId}})
  res.json(myhotels)

});
router.get("/getpdf",async (req,res) =>
  {
   doc.pipe(fs.createWriteStream("mybooking.pdf"))
   doc.fontSize(25).text("hi this is my first text")
  doc.end()
  res.end()
 
  });

module.exports = router;
