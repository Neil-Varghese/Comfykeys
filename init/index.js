//to initialize the database
const mongoose = require("mongoose");                           //to connect to the database
const initData = require("./data.js");                          //to get the data to initialize the database
const Listing = require("../models/listing.js");                //to access the Listing model

const MONGO_URL = "mongodb://127.0.0.1:27017/ComfyKeys";        //the URL to connect to the database
async function main(){                                          //function to connect to the database
    await mongoose.connect(MONGO_URL);
}

main()                                                          //to connect to the database
.then(() => {                                                   //if connected
    console.log("connected to DB.");
})
.catch((err) => {                                               //if not connected
    console.log(err);
});

//function to initialize database
const initDB = async () => {
    await Listing.deleteMany({}); //to first empty the database 
    initData.data = initData.data.map((obj) => ({...obj, owner: "679086c2b6c5e9d004e8a7cf"})); //to add the owner id to each object
    await Listing.insertMany(initData.data);  //then to initialize the database
    console.log("data was initialized");
}

initDB();                                               //to initialize the database