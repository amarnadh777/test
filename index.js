const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
const hotel = require("./routes/hotel")
const userRoutes = require("./routes/user")
const bookingroute = require("./routes/booking")
const mongoose = require("mongoose");


/*const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connceted to database");
   
    
  } catch (error) {
   
    console.log(error)
  }


};
    */

const uploader = require('./utils/multer')
const cloudinary = require("./utils/cloudinary")

dotenv.config();
app.use(
  cors()
)


app.use(express.json())

app.use("/api/hotel",hotel)
app.use("/api/user",userRoutes)
app.use("/api/booking",bookingroute)
app.get("/test",(req,res) =>
{
           res.json({"name":"amarnadh"})
})
app.listen(process.env.PORT, () => {


  console.log("port is runnig at ", process.env.PORT);
});
