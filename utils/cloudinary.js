const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dati6fdzg', 
    api_key: '589318217265841', 
    api_secret: 'N6xBiWob6WnUsFLpmCVZOk9qym4'
    
  });
  console.log("colundinary configration success")
  module.exports = cloudinary