// Description: Controller for handling listing routes.

const Listing = require("../models/listing");                             // Import Listing model
const Review = require("../models/review");                               // Import Review model
const User = require("../models/user");                                   // Import User model
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");    // Import Mapbox Geocoding API
const mapToken = process.env.MAP_TOKEN;                                   // Mapbox API Token
const geocodingClient = mbxGeocoding({ accessToken: mapToken });          // Initialize Mapbox Geocoding API


// Function to fetch all listings
module.exports.index = async (req, res) => {                               // Export function to fetch all listings
    let { search, category } = req.query;                                  // Destructure search and category from query parameters
    let query = {};                                                        // Initialize query object

    if (category) {                                                         // If category is present in query parameters
        query.categories = { $regex: new RegExp(category, "i") }; // Case-insensitive category search
    }

    if (search) {                                                           // If search is present in query parameters
        const searchRegex = new RegExp(search, "i");
        const owners = await User.find({ username: searchRegex }).select("_id");

        query.$or = [                                                       // Search in title, location, country, description, categories, and owner
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex },
            { description: searchRegex },
            { categories: { $regex: searchRegex } },
            { owner: { $in: owners.map((owner) => owner._id) } },
        ];
    }

    try {                                                                   // Try to fetch all listings
        let allListings = await Listing.find(query);
        let listingsCount = 0;
        let reviewsCount = 0;

        if (req.user) {                                        // If user is logged in      
            listingsCount = await Listing.countDocuments({ owner: req.user._id });
            reviewsCount = await Review.countDocuments({ author: req.user._id });
        }

        res.render("listings/index.ejs", {                        // Render index.ejs with all listings
            allListings, category, search, listingsCount, reviewsCount 
        });
    } catch (error) {                                               // Catch any errors
        console.error("Error fetching listings:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.renderNewForm = async (req, res) => {                // Export function to render new listing form   
    let listingsCount = 0;
    let reviewsCount = 0;

    if (req.user) {                                   // If user is logged in   
        listingsCount = await Listing.countDocuments({ owner: req.user._id });
        reviewsCount = await Review.countDocuments({ author: req.user._id });
    }

    res.render("listings/new.ejs", { listingsCount, reviewsCount });    // Render new.ejs
};

module.exports.showListing = async (req, res) => {                           // Export function to show a listing
    let { id } = req.params;                                                 // Destructure id from request parameters
    try {                                                                    // Try to fetch listing by id
        const listing = await Listing.findById(id)                           // Populate reviews and owner   
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");

        if (!listing) {                                                     // If listing is not found
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        let listingsCount = 0;
        let reviewsCount = 0;

        if (req.user) {                                                         // If user is logged in
            listingsCount = await Listing.countDocuments({ owner: req.user._id });
            reviewsCount = await Review.countDocuments({ author: req.user._id });
        }

        res.render("listings/show.ejs", { listing, listingsCount, reviewsCount });      // Render show.ejs with listing
    } catch (error) {                                                           // Catch any errors
        console.error("Error fetching listing:", error);                        // Log error
        req.flash("error", "Something went wrong.");                            // Flash error message
        res.redirect("/listings");                                              // Redirect to /listings
    }
};

module.exports.createListing = async (req, res) => {                                    // Export function to create a new listing
    try {                                                                               // Try to create a new listing
        let response = await geocodingClient.forwardGeocode({                           // Forward geocode location
            query: req.body.listing.location,
            limit: 1,
        }).send();

        if (!response.body.features.length) {                                           // If location is invalid
            req.flash("error", "Invalid location. Please enter a valid location."); 
            return res.redirect("/listings/new");
        }

        let url = req.file.path;
        let filename = req.file.filename;   
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry;

        await newListing.save();
        req.flash("success", "New Listing Created!");                                   // Flash success message
        res.redirect("/listings");
    } catch (error) {                                                                   // Catch any errors
        console.error(error);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/listings/new");
    }
};

module.exports.renderEditForm = async (req, res) => {                                   // Export function to render edit form
    let { id } = req.params;                                                            // Destructure id from request parameters
    try {                                                                               // Try to find listing by id
        const listing = await Listing.findById(id);

        if (!listing) {                                                                 // If listing is not found
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
        
        let listingsCount = 0;
        let reviewsCount = 0;

        if (req.user) {                                                                 // If user is logged in
            listingsCount = await Listing.countDocuments({ owner: req.user._id });
            reviewsCount = await Review.countDocuments({ author: req.user._id });
        }

        res.render("listings/edit.ejs", { listing, originalImageUrl, listingsCount, reviewsCount });  // Render edit.ejs with listing
    } catch (error) {                                                                   // Catch any errors
        console.error(error);
        req.flash("error", "Something went wrong.");
        res.redirect("/listings");
    }
};

module.exports.updateListing = async (req, res) => {                                    // Export function to update a listing
    let { id } = req.params;                                                            // Destructure id from request parameters
    try {
        if (!req.body.listing) {                                                        // If no data is sent for listing
            throw new Error("Send valid data for listing");
        }

        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        let response = await geocodingClient.forwardGeocode({                           // Forward geocode location
            query: req.body.listing.location,
            limit: 1,
        }).send();

        if (!response.body.features.length) {                                           // If location is invalid
            req.flash("error", "Invalid location. Please enter a valid location.");
            return res.redirect("/listings/new");
        }

        listing.geometry = response.body.features[0].geometry;                          // Update geometry
        await listing.save();                                                           

        if (req.file) {                                                                 // If new image is uploaded
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }

        req.flash("success", "Listing Updated!");                                       
        res.redirect(`/listings/${id}`);
    } catch (error) {                                                                    // Catch any errors
        console.error(error);
        req.flash("error", "Something went wrong.");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.destroyListing = async (req, res) => {                                   // Export function to delete a listing
    let { id } = req.params;                                                            // Destructure id from request parameters
    try {                                                                               // Try to delete listing by id
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    } catch (error) {                                                                   // Catch any errors
        console.error(error);
        req.flash("error", "Something went wrong.");
        res.redirect("/listings");
    }
};
