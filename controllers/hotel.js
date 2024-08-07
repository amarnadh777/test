const hotel = require("../models/hotel");
const Hotel = require("../models/hotel");
const uuid = require('uuid')
const createHotel = async (req, res) => {
  try {
    const { name,price, type, city, address, distance, rating, description } =
      req.body;
const hotelId = uuid.v4()
    console.log(name, type, city, distance, rating, description);
    const newHotel = new Hotel({
      hotelId:hotelId,
      name: name,
      type: type,
      city: city,
      address: address,
      distance: distance,
      price:price,
      rating: rating,
      description: description,
    });
    
    const saveHotel = await newHotel.save();
    res.status(200).json({ status: "hotelcreated" });
  } catch (error) {
    res.json({ status: "something went wrong" }).status(400);
  }
};
const getHotel = async(req,res) =>
    {
        res.send("hiii....")
    }
module.exports = createHotel


