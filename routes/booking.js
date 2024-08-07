const express = require("express");
const jwt = require("jsonwebtoken");
const booking = require("../models/booking");
const hotel = require("../models/hotel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "welcome" });
});
/* 
router.post("/booking", async (req, res) => {
  try {
    const { hotelId, userId } = req.body;
    
    const hoteldata = await Hotel.findById(hotelId);
    const hotelname = hoteldata.name;
    const hotelcity = hoteldata.city;
    const hoteladdress = hoteldata.address;

    const newBooking = new booking({
      hotelId: hotelId,
      userId: userId,
      hotelname: hotelname,
      hotelcity: hotelcity,
      hoteladdress: hoteladdress,
    });
    await newBooking.save();
    res.status(200).json({ status: "booked succefully" });
  } catch (error) {}
});
*/
router.post("/createbooking",async(req,res) =>
{
console.log(req.body)
 
  try {
  
  
const {fullname,email,hotelId,userId,mobilenumber} = req.body
const hoteldetails = await hotel.findOne({hotelId:{$eq:hotelId}});
console.log(hoteldetails)
console.log(hotelId)
   const newBooking = new booking({
     hotelId: hotelId,
     userId: userId,
     fullname:fullname,
     email:email,
     mobilenumber:mobilenumber,
     hotelname:hoteldetails.name
  
   });
   await newBooking.save();
   res.status(200).json({ status: "booked succefully" });
  
    
  } catch (error) {
    console.log(error)
  }
  
})
router.get("/mybooking/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const myBooking = await booking.find({ userId: { $eq: userId } });
    const hotelIds = myBooking.filter((each) => {
      const hotleIDS = each.hotelId;
      console.log(hotleIDS);
    });

    res.status(200).json(myBooking);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/test", async (req, res) => {
  try {
    const HotelData = await booking.find();
    console.log(HotelData);
    res.json(HotelData).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/test", async (req, res) => {
  try {
     console.log(req.body)
     console.log("post")
     res.end()
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
