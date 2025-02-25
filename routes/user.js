const express = require("express");   //to use express
const router = express.Router();      //instance of router
const User = require("../models/user.js"); //to use user model
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport"); //for password storing (user model)
const { saveRedirectUrl } = require("../middleware.js");  //to save the redirect url


const userController = require("../controllers/users.js"); //to use user controller 


//SIGNUP ROUTES
router
    .route("/signup")
    .get(userController.renderSignupForm) //to render signup page
    .post(wrapAsync(userController.signup)); //to register the user



//LOGIN ROUTES
router
    .route("/login")
    .get( userController.renderLoginForm) //to render login page
    .post(                     //to login the user
        saveRedirectUrl,                //to save the redirect url
        passport.authenticate("local", {    //to authenticate the user
            failureFlash: true, 
            failureRedirect: "/login"
        }),
        userController.login
    );


//LOGOUT ROUTES
router.get("/logout", userController.logout); //to logout the user

module.exports = router;             //to export the router