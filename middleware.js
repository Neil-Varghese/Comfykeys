const Listing = require("./models/listing");  //to import the listing model
const Review = require("./models/review");    //to import the review model
const ExpressError = require("./utils/ExpressError.js");  //to import custom made error class
const {listingSchema, reviewSchema} =  require("./schema.js");   //to import joi schema and its parameter validations for listings


//middleware to make sure that the user is loggedin
module.exports.isLoggedIn = (req,res,next) => {              //to check if the user is logged in or not
    if(!req.isAuthenticated()){                              //if not logged in
        req.session.redirectUrl = req.originalUrl;           //to redirect to the same page after login
        req.flash("error","You must be logged in to create a new listing!");
        return res.redirect("/login");
    }
    next();                                                  //if logged in
};

//middleware to save the redirect url
module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){                             //if the redirect url is present in the session
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


//middleware to check if the user is the owner of the listing
module.exports.isOwner = async(req,res,next) => {                   //to check if the user is the owner of the listing
    let {id} = req.params;

    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){             //if the user is not the owner of the listing
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();                                                        //if the user is the owner of the listing
}

//middleware to check the joi validation conditions for listing
module.exports.validateListing = (req,res,next) => {                     //checking the joi validation conditions for listing
    let {error} = listingSchema.validate(req.body);             //it will extract error if error comes  
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");   //intricate way of extracting error message
        throw new ExpressError(400,errMsg);
    }
    else{
        next();                                                         //if no error
    }
}


//middleware to validate the review
module.exports.validateReview = (req,res,next) => {                     //checking the joi validation conditions for review
    let {error} = reviewSchema.validate(req.body);             //it will extract error if error comes  
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");   //intricate way of extracting error message
        throw new ExpressError(400,errMsg);
    }
    else{
        next();                                                          //if no error
    }
}



module.exports.isReviewAuthor = async(req,res,next) => {               //to check if the user is the author of the review
    let {id, reviewId} = req.params;                                   //extracting the id and reviewId from the params

    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){                     //if the user is not the author of the review
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();                                                           //if the user is the author of the review
}