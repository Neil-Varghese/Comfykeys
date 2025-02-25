const express = require("express");   //to use express
const router = express.Router();      //instance of router
const wrapAsync = require("../utils/wrapAsync.js");   //to import custom made wrapAsync function
const Listing = require("../models/listing.js"); //to use listing model
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js"); //to use isLoggedIn middleware
const path = require("path");         //to use path
const listingController = require("../controllers/listings.js");//to use listing controller
const multer  = require('multer')      //to use multer
const {storage} = require("../cloudConfig.js");   //to use cloudinary storage
const upload = multer({ storage });         //to use cloudinary storage for image upload



router                                              //route to display all listings
    .route("/")
    .get(wrapAsync(listingController.index))        //route to display all listings
    .post(isLoggedIn,                                          //add new listing information to the database
       upload.single('listing[image]'),
       validateListing,
       wrapAsync(listingController.createListing)             
    )
    



//new route                       //this must be placed before router.get("/listings/:id") so that it does not take new as an id 
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    .delete(                               //DELETE ROUTE
        isLoggedIn, 
        isOwner,
        wrapAsync(listingController.destroyListing)
    )
    .put(                                 //UPDATE ROUTE
        
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.updateListing)
    )
    .get( wrapAsync(listingController.showListing));   //SHOW route / route to individual listing



//edit route
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;