// Purpose: To handle the user related routes

const User = require("../models/user.js"); //to use user model

module.exports.renderSignupForm = (req,res) => {                   //to render signup page
    res.render("users/signup.ejs");
}

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");                   //to render login page
}


module.exports.login = async(req,res) => {                                   //if user is authenticated
    req.flash("success","Welcome back to ComfyKeys!");
    res.redirect(res.locals.redirectUrl || "/listings");                 //to redirect to the same page after login
} 


module.exports.logout = (req,res,next) => {
    req.logout((err) => {                     //to logout the user
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out now!");
        res.redirect("/listings");
    });
}


module.exports.signup = async(req,res) => {     //to register the user
    try{
        let {email,username,password} = req.body;    //to get the data from the form
        let newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err) => {              //to login the user after registration
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to ComfyKeys!");
            res.redirect("/listings");
        });
    }
    catch(e){                                  //if user already exists
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}