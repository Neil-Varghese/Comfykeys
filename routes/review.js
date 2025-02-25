const express = require("express");   //to use express
const router = express.Router({mergeParams: true});      //instance of router
const wrapAsync = require("../utils/wrapAsync.js");   //to import custom made wrapAsync function
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")  

const reviewController = require("../controllers/reviews.js");   //to use review controller




//Post route / create review route
router.post(
    "/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview)
);


//Delete review route
router.delete(
    "/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router