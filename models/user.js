//USER MODEL
const mongoose = require("mongoose");   //require mongoose
const Schema = mongoose.Schema;         //create a schema
const passportLocalMongoose = require("passport-local-mongoose");   //require passport-local-mongoose

const userSchema = new Schema({         //create a new schema
    email: {                            //email field
        type: String,
        required: true,
    },
    //passportLocalMongoose will automatically create username and password
})

userSchema.plugin(passportLocalMongoose);                    //use passportLocalMongoose
module.exports = mongoose.model('User',userSchema);          //export the model