const mongoose  = require('mongoose')
const HotelSchema = new mongoose.Schema({
hotelId:{type:String},
name : {type:String,required:true},
type : {type:String,required:true },
city : {type:String,required:true },
address : {type:String,required:true }
,
distance : {type:String,required:true },
photos: {data: Buffer,
    contentType: String},
    reviewcount:{type:Number},
rating : {type:Number,min:0,max:5},
price:{type:String},
description : {type:String,required:true },
rooms : {type:[String],},


})
module.exports = mongoose.model("hotel",HotelSchema)