const multer = require('multer')


const storage = multer.diskStorage({})
const uploader = multer({storage:storage})
console.log("multer multer connectd")

module.exports = uploader