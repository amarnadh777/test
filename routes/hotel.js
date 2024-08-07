const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");
const { default: hotel } = require("../models/hotel");
const createHotel = require("../controllers/hotel")
const getHotel = require("../controllers/hotel");
const { route } = require("./user");
const uuid = require('uuid')
const cloudinary = require('cloudinary').v2;
const multer = require("multer");

router.post("/create",createHotel);
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
cloudinary.config({
  cloud_name: 'dati6fdzg', 
  api_key: '589318217265841', 
  api_secret: 'N6xBiWob6WnUsFLpmCVZOk9qym4'
  });

router.get("/", async (req, res) => {
  try {
    console.log(process.env.api_key)
    const HotelData = await Hotel.find();

    res.json(HotelData).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// router.get("/test",getHotel)


router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.json({ status: "deleted succesfully" }).status(200);
  } catch (error) {
    res.json({ status: "some thing went wrong" }).status(400);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const getHotel = await Hotel.findOne({hotelId:{$eq:req.params.id}});
    res.json(getHotel).status(200);
  } catch (error) {
    res.json({ status: "some thing went wrong" }).status(400);
  }
});
router.get("/getcity/:city", async (req, res) => {
  try {
     const city = req.params.city
    const getHotel = await Hotel.find({city:{$eq:req.params.city}})
    
    if(getHotel.length == 0)
    {
      res.json({status:`not hotel in the ${city} `})
    }
    else  
    {
      res.json(getHotel).status(200);
    }
    
  } catch (error) {
    res.json({ status: "some thing went wrong" }).status(400);
  }
});
router.post("/add-comment",async (req,res) =>{
  const {comment,hotelId} = req.body
  try {
    
  } catch (error) {
    
  }

})
router.post("/give-review",(req,res) =>{
  const {rating,hotelId} = req.body
  try {
   const hotelReview = new Hotel.findByIdAndUpdate(hotelId,{rating:rating})
   
    
  } catch (error) {
    
  }
})
router.post("/postimg",upload.single('image'),async(req,res) =>
{
 try {
 
  const path = req.file.path
   
   res.end()
   console.log(req.file)
 } catch (error) {
   res.json(error)
   console.log(error)
 }
})


module.exports = router;
