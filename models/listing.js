//LISTING OF PROPERTIES MODEL

const mongoose = require("mongoose");               //requiring mongoose
const Schema = mongoose.Schema;                     //requiring Schema
const Review = require("./review.js");              //requiring Review model

const listingSchema = new Schema({                  //creating a new Schema
    
    title: {                                        //title field
        type: String,
        required: true,
    },
    
    description: String,                            //description field
    
    image: {                                        //image field
        url: String,
        filename: String
    },
    
    price: Number,                                  //price field
    
    location: String,                               //location field
    
    country: String,                                //country field 

    reviews: [                                      //reviews field
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner:{                                         //owner field
            type: Schema.Types.ObjectId,
            ref: "User"
    },

    geometry: {                                     //geometry field
        type: {                                     // 'geometry' is an object with required 'type' property
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {                               // 'coordinates' is an array of numbers    
            type: [Number],
            required: true
        }
    },

    categories: {                                   //categories field
        type: [String], // Specifies an array of strings
        enum: ['Popular', 'Pools', 'Rooms', 'Beach', 'City', 'Hills', 'Camping', 'Snow', 'Monuments', 'Luxury', 'Farm', 'Boating', 'Skiing', 'Play', 'Boring'], // Allowed values
    },
});

//mongoose middleware to delete all reviews if listing is deleted
listingSchema.post("findOneAndDelete", async(listing) => {             //post middleware to delete all reviews if listing is deleted
    if(listing){                                                       //if listing exists
        await Review.deleteMany({_id: { $in: listing.reviews}});       //delete all reviews
    }
});

const Listing = mongoose.model("Listing",listingSchema);               //exporting the model
module.exports = Listing;                                            