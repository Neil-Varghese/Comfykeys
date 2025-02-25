const cloudinary = require('cloudinary').v2;  // Importing cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');  // Importing cloudinary storage
require('dotenv').config(); // Ensure you have dotenv configured


cloudinary.config({                                 //configuring cloudinary
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



const storage = new CloudinaryStorage({ //configuring cloudinary storage
    cloudinary: cloudinary,
    params: {                           //parameters for cloudinary storage
      folder: 'comfykeys_DEV',          //folder name
      allowed_formats: ["png", "jpg", "jpeg"]   //allowed formats
    },
});


module.exports = {     //exporting cloudinary and storage
    cloudinary,      
    storage
};