const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({hotelId:{type:String} ,userId:{type:String} ,
    fullname:{type:String} ,
    email:{type:String} ,
    mobilenumber:{type:String} ,hotelname:{type:String}




})
const booking = mongoose.model("booking",bookingSchema)
module.exports = booking 