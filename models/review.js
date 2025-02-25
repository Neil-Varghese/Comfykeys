//REVIEW MODEL
const mongoose = require("mongoose");    //requiring mongoose
const Schema = mongoose.Schema;          //requiring Schema

const reviewSchema = new Schema({        //creating a new Schema

    comment: String,                     //comment field

    rating: {                            //rating field
        type: Number,
        min: 1,
        max: 5
    },

    createdAt: {                        //createdAt field
        type: Date,
        default: Date.now()
    },

    author: {                           //author field
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Review", reviewSchema);        //exporting the model