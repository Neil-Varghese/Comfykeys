// Description: This file contains all the review related controller functions.

const Listing = require("../models/listing.js"); //to use listing model
const Review = require("../models/review.js"); //to use review model

module.exports.createReview = async(req,res) => {   //create a new review
    console.log(req.params.id);                                     
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();                         //save the review
    await listing.save();                           //save the listing
    req.flash("success","New Review Created!");     //flash message
    res.redirect(`/listings/${id}`); 
}

module.exports.destroyReview = async(req,res) => {      //delete a review
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}