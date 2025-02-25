//DEFINING A JOI SCHEMA AND ITS ATTRIBUTES for various forms
const Joi = require('joi');

//Schema for user registration
module.exports.listingSchema = Joi.object({    //Joi.object is used to define the schema
    listing: Joi.object({                      
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        categories: Joi.array().items(Joi.string().valid('Popular', 'Pools', 'Rooms', 'Beach', 'City', 'Hills', 'Camping', 'Snow', 'Monuments', 'Luxury', 'Farm', 'Boating', 'Skiing', 'Play', 'Boring')),
        location: Joi.string().required(),
        price: Joi.number().required().min(0), 
        image: Joi.string().allow("", null),
    }).required(),                             //required() is used to specify that the field is mandatory
});

//Schema for user login
module.exports.reviewSchema = Joi.object({    //Joi.object is used to define the schema
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required(),                        
})                                            