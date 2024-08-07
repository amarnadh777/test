const  mongoose = require("mongoose")
const userScheama = new mongoose.Schema(
{
      username:{type:String},password:{type:String},userId:{type:String},email:{type:String},mobilenumber:{type:String},address:{type:String},profileurl:{type:String}
}
)
const user = mongoose.model("user",userScheama)
module.exports = user